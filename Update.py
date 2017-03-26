import facebook


graph = facebook.GraphAPI(access_token='EAAX4JJPK6jkBAMTSIrB00dYuYO35grS0tZAxge9y0dfp3O9KPqXwG7bomp2D620va8yFnMeymsAbGx9dBbr0PXSCYEk1E3YRhj2DAt46JU9ZB4yD62gvahWg3s0vaId92qWsWCpdf07fXxZCgSU65GFx4QQrWT7ZBPiN7myjvnjFBX5ucmNVTOmyjWp3WfkZD', version='2.7')
attachment =  {
    'name': 'Link name',
    'link': 'https://www.example.com/',
    'caption': 'Check out this example',
    'description': 'This is a longer description of the attachment',
    'picture': 'https://www.example.com/thumbnail.jpg'
}

#graph.put_wall_post(message='Check this out...', attachment=attachment)
#1031262963672150
profile = graph.get_object("1031262963672150")
posts = graph.get_connections(profile['id'], 'posts')

graph.put_comment(object_id='1031262963672150_1032927990172314', message='Great post...')


#print(posts)

