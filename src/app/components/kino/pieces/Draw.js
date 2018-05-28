import React from 'react'
import Ball from './Ball'

const Draw = ({drawTime, drawResults,optionalClassNames, classStyle,mixed }) => {

    var ballClassStyle = optionalClassNames;

    if(mixed){
        ballClassStyle = 'blue-balls';
        if(classStyle){
            ballClassStyle = 'green-balls';
        }
    }

    const numbersResults = drawResults.map(drawNumber =>
        <Ball
            key={drawNumber}
            number={drawNumber}
            classStyle={optionalClassNames + "  "+ ballClassStyle + " column"}
        />
    );

    const draw = (
        <div className="ui segment">
            <h4 className="ui horizontal divider header">
                <i className="wait icon"></i>
                {drawTime}
            </h4>
            <div className="ui grid">
                <div className="aligned centered ten column row mobile-margin-right">
                    {numbersResults}
                </div>
            </div>

        </div>
    );

    return (
        draw
    )
}

export default Draw;