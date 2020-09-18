import React, {Component} from 'react';

import Container from './Container';
import PageTitle from './PageTitle';
import TacoList from './TacoList';
import AddTaco from './AddTaco';
import axios from 'axios';

export default class TacosAdmin extends Component{

    state = {
        tacos: []
    }


    render() {
        return (
            <Container>
                <PageTitle text='Taquería Nigster' color='black' fontSize={5}/>
                <TacoList/>
                <AddTaco/>
             </Container>
        );
    }
}