import React from 'react';
import { shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './masthead.css';
import Mast from './timer.js';
const Masthead = props => {
    
const classes = mergeClasses(defaultClasses, props.classes);
return (
<div className='container'>
    <div className='wrapper'>
        <div className="flexing_item">
            <div className='foto1'>
                <div className='foto1_text'>
                    <p>
                        Це твій час для<br/>   
                        найкращої подорожі
                    </p>
                    <a href='https://www.google.com'>ТОВАРИ</a>
                </div>
                <img className='foto1' src="/src/components/Mast/img/peple_bag.jpg" />
            </div>
            <div className='item_second_grid'>
                <div className='foto3'>
                <img src="/src/components/Mast/img/nature2.jpg" />
                </div>
                <img className='foto2' src="/src/components/Mast/img/nature.jpg" />
            </div>
        </div>
        <div className='tttimer'>
            <div className='timer_back'>
                ЧАС ДО ПОЧАТКУ РОЗПРОДАЖІ
            </div>
            <div id="timer" class="timer col">
                <div class="timer-section">
                    <div class="days-block">
                      <span class="days">00</span>
                    </div>
                        <span class="uncorrectDays">ДНІВ</span>
                </div>
                <div class="timer-section">
                    <div class="hours-block">
                        <span class="hours">00</span>
                    </div>
                <span class="uncorrectHours">ГОДИН</span>
            </div>
            <div class="timer-section">
                <div class="minutes-block">
                    <span class="minutes">00</span>
                </div>
                    <span class="uncorrectMinutes">ХВИЛИН</span>
                </div>
                <div class="timer-section">
                    <div class="seconds-block">
                    <span class="seconds">00</span>
                    </div>
                    <span class="uncorrectSeconds">СЕКУНД</span>
                </div>
            </div>
        </div>
    </div>
    <script src='timer.js'></script>
</div>


);
};
export default Masthead;
Masthead.propTypes = {
classes: shape({
root: string
})
};
