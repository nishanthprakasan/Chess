import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChessConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs'].get('room_id')
        self.room_group_name  = f'play_{self.room_name}'
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        if json.loads(text_data)['action'] == 'move':
            data = json.loads(text_data)['data']
            piece = data.get('piece')
            initialPos = data.get('initialPos')
            finalPos = data.get('finalPos')
            colour = data.get('colour')
            castle = data.get('castle')

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'game_move',
                    'piece': piece,
                    'initialPos': initialPos,
                    'finalPos': finalPos,
                    'colour' : colour,
                    'castle' : castle
                }
            )
        elif json.loads(text_data)['action'] == 'game_status':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'game_status',
                    'colour': json.loads(text_data)['colour'],
                    'message':  json.loads(text_data)['message'],
                    'status': json.loads(text_data)['status'],
                }
            )
        elif json.loads(text_data)['action'] == 'move_store':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'move_store',
                    'move': json.loads(text_data)['move'],
                }
            )
        elif json.loads(text_data)['action'] == 'timer':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'timer',
                    'whiteTime': json.loads(text_data)['white_timer'],
                    'blackTime' :json.loads(text_data)['black_timer']
                }
            )
        elif json.loads(text_data)['action'] == 'draw_offer':
            print('draw offered')
            print(json.loads(text_data)['colour'])
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type' : 'draw_offer',
                    'colour' : json.loads(text_data)['colour']
                }
            )

    def game_move(self, event):
        self.send(text_data=json.dumps({
            'type': 'game_move',
            'piece': event['piece'],
            'initialPos': event['initialPos'],
            'finalPos': event['finalPos'],
            'colour' : event['colour'],
            'castle' : event['castle']
 
        }))
        
    def game_status(self,event):
        self.send(text_data=json.dumps({
            'type' : 'game_status',
            'colour' : event['colour'],
            'status' : event['status'],
            'message' : event['message']
        }))
    
    def move_store(self,event):
        self.send(text_data=json.dumps({
            'type' : 'move_store',
            'move' : event['move']
        }))
    
    def timer(self,event):
        self.send(text_data=json.dumps({
            'type' : 'timer',
            'white_timer' : event['whiteTime'],
            'black_timer' : event['blackTime']
        }))

    def draw_offer(self,event):
        self.send(text_data=json.dumps({
            'type' : 'draw_offer',
            'colour' : event['colour']
        }))
