# Generated by Django 5.1 on 2024-09-01 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginscreen', '0005_alter_userinfo_activity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gameinfo',
            name='gameId',
            field=models.CharField(max_length=300),
        ),
    ]
