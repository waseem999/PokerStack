import React from 'react';
import axios from 'axios';

export default function (props) {
    let users = props.users;
return (
    <div>
    <button className="btn btn-primary" onClick={props.getLeaderboardUsers}>GET CURRENT LEADERBOARD</button>
     <table className="table table-striped" width="647">
        <thead>
            <tr>
            <th>Qualifying Player</th>
            <th>Chip Total</th>
            </tr>
        </thead>
        <tbody>
            {
            users && users.map(user => (
                <tr key={user.user.id}>
                <td>
                    <span>{user.user.username}</span>
                </td>
                <td>{ user.chiptotal }</td>
                </tr>
            ))
            }
        </tbody>
    </table>
    </div>
    
  );

}