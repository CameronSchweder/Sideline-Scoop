import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Game-Preseason-Info')

# Add an attribute to table
#for item in items:
#    table.update_item(
#        Key={'teamId': item['teamId']},
#        UpdateExpression="SET away",
#        ExpressionAttributeValues={
#            ':ties': ''
#        }
#    )

# Remove an attribute from table
#for item in items:
#    table.update_item(
#        Key={'teamId': item['teamId']},
#        UpdateExpression="REMOVE away"
#    )