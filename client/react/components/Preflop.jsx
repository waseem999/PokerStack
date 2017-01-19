import React from 'react';


export default function (props) {
    console.log("PROPS", props)
return (
      <div className="row">
          <div className="col-xs-12 col-sm-12">
            <h1>Poker</h1>
          </div>
          <div className="col-xs-12 col-sm-12">
            <form onSubmit={props.handleSubmit} className="form-inline">
              <div className="form-group">
                <label className="sr-only" htmlFor="bet">Bet</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      onChange={props.handleChange}
                      id="bet"
                      value={props.inputValue}
                      placeholder="Bet Amount" />
                    </div>
              </div>
                  <button type="submit" className="btn-sm btn-custom">Bet</button>
            </form>
          </div>
          {
            props.lowerbet ? <strong>REDUCE YOUR BET AMOUNT</strong> : null
          }
          <div>
            <strong>Pot Size: {props.potsize}</strong>
          </div>
          <div>
            <strong>{props.user} Chip Balance: {props.chips}</strong>
          </div>
                  <button className="btn-sm btn-custom" onClick={props.dealCards}>
                      <span className="hidden-xs">Deal Cards</span>
                  </button>
                 
            <div>
               {
               props.yourcards[0] && 
                      (
                       <table width="700">
                          <thead>
                                <tr>
                                  <th>Your Cards</th>
                                </tr>
                          </thead>
                          <tbody>
                                  <tr>
                                    <td><img src={props.yourcards[0].image} className="Image-logo"/><img src={props.yourcards[1].image} className="Image-logo"/></td>
                                 
                                    <td><img src={props.villaincards[0].image} className="Image-logo"/><img src={props.villaincards[1].image} className="Image-logo"/></td>
                                  </tr>
                          </tbody>
                          <thead>
                            <tr><strong>Community Cards</strong></tr>
                          </thead>
                          <tbody>
                                <tr>
                                    <td><img src={props.communitycards[0].image} className="Image-logo"/><img src={props.communitycards[1].image} className="Image-logo"/><img src={props.communitycards[2].image} className="Image-logo"/></td>
                              </tr>
                              
                              <div>
                                <h2>{props.result}</h2>
                              </div>
                          </tbody>
                  </table>
                      )
               }
            </div>
            <div>
            <button type="submit" className="btn-sm btn-custom" 
                  onClick={ () => {location.href = '/'}}>Exit Game</button>   
            </div>
        </div>

    )

}