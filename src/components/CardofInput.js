import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button
} from 'reactstrap';

const InputCard = (props) => {
    return (
        <Card body className="text-center">
            <CardBody>
                <CardTitle >Labelled Bracket</CardTitle>
            </CardBody>

            {/* Input box */}
            <div class="form-group">
                <textarea class="form-control" rows="9" id="comment" placeholder="[S[NP[NCMN ฉัน]]]"></textarea>
            </div>

            {/* Buttons  */}
            <span>
                <Button color="primary" size="sm">Draw</Button>{' '}
                <Button color="primary" size="sm">Clear</Button>
            </span>
        </Card>
    );
};

export default InputCard;