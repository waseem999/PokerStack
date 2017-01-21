import React from 'react';


export default function (props) {
return (
    <div>
        <table>
            <thead>
                <tr><strong>Community Cards</strong></tr>
            </thead>
                <tbody>
                    <tr>
                        <td><img src={props.communitycards[0].image} className="Image-logo"/><img src={props.communitycards[1].image} className="Image-logo"/><img src={props.communitycards[2].image} className="Image-logo"/></td>
                    </tr>
            </tbody>
        </table>
    </div>
   )
}