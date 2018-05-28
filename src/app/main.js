import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';
import "semantic-ui-less/semantic.less";
import "./styles/custom.css";
import 'react-dates/lib/css/_datepicker.css';

render(
    <Root/>
    , document.getElementById('app'));
