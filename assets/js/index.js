/**
 * Created by onepiece on 2/1/17.
 */
$(document).ready(function(){

    var users=database.ref().child("users");
    users.on("child_added",snap => {
    var row=$('#get_users');
    var html='';
    html +="<tr>";
    //id user
    html +="<td>";
    html +=snap.child("idUser").val();
    html +="</td>";
    // name
    html +="<td>";
    html +=snap.child("name").val();
    html +="</td>";
    //username
    html +="<td>";
    html +=snap.child("username").val();
    html +="</td>";
    // addme
    html +="<td>";
    html +=snap.child("addme").val();
    html +="</td>";
    // email
    html +="<td>";
    html +=snap.child("email").val();
    html +="</td>";
    //shares
    html +="<td>";
    html +=snap.child("shares").val();
    html +="</td>";

    
    html +="</tr>";
    row.append(html);
    // $('#table').DataTable();
});



});


// check on media every hour then delete nodes depend on time period
// setInterval(function(){
//     var media=database.ref().child("Media");
//     media.on("child_added",snap => {
//         var timer=snap.child("time").val();
//     var time_period=snap.child("timePeriod").val();
//     var media_date=moment.unix(timer/1000).format('DD MMM YYYY, h:mm a');
//     var current_date=moment(new Date());
//     var duration=moment.duration(current_date.diff(media_date)).asHours();
//     duration=parseInt(duration);
//
//     if(time_period==null)
//     {
//         media.child(snap.getKey()).remove();
//     }
//     if(time_period!=null && duration > time_period)
//     {
//
//         media.child(snap.getKey()).remove();
//         // console.log(time_period);
//         // console.log(duration);
//     }
//
// });
// },1000*60*60);



function refreshData(){
    var media=database.ref().child("Media");
    media.on("child_added",snap => {
        var timer=snap.child("time").val();
    var time_period=snap.child("timePeriod").val();
    var media_date=moment.unix(timer/1000).format('DD MMM YYYY, h:mm a');
    var current_date=moment(new Date());
    var duration=moment.duration(current_date.diff(media_date)).asHours();
    duration=parseInt(duration);

    if(time_period==null)
    {
        media.child(snap.getKey()).remove();
    }
    if(time_period!=null && duration > time_period)
    {

        media.child(snap.getKey()).remove();
        // console.log(time_period);
        // console.log(duration);
    }

});
    setTimeout(refreshData,1000*60*60);
}

refreshData();