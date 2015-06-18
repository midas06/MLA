FB.init({
    appId: '1614696858799001', 
    status: true, 
    cookie: true,
    xfbml: true
});

function share_prompt()
{
    FB.ui(
       {
         method: 'feed',
         name: 'MLA App',
         link: 'http://developers.facebook.com/docs/reference/dialogs/',
         picture: 'http://fbrell.com/f8.jpg',
         caption: 'Reference Documentation',
         description: 'Dialogs provide a simple, consistent interface for applications to interface with users.',
         message: 'Facebook Dialogs are easy!'
       },
       function(response) {
         if (response && response.post_id) {
           alert('Post was published.');
         } else {
           alert('Post was not published.');
         }
       }
     );
 }
