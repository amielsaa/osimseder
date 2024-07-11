import React from 'react';

function ScoreBar({ numberOfCompletedTasks, numberOfTasks }) {

    const calculateWidth = () => {
        if (numberOfTasks === 0) {
            return '0%';
        } else {
            const width = ((numberOfCompletedTasks / numberOfTasks) * 100).toFixed(2);
            return `${width}%`;
        }
    };

    const getScore = () => {
        if (numberOfTasks === 0) {
            return 'טרם נוצרו מטלות';
        } else {
            return `${numberOfCompletedTasks}/${numberOfTasks}`;
        }
    };

    const width = calculateWidth();
    const score = getScore();

    return (
        <div className='review-bar-and-score flex align-center row'>
            {numberOfTasks !== 0 ? (
                <>
                    <div className='review-bar-out-of'>
                        <div className='review-bar-score' style={{ width }}></div>
                    </div>
                    <span className='score'>{score}</span>
                </>
            ) : (
                <span className='no-tasks-indicator'>{score}</span>
            )}
        </div>
    );
}

export default ScoreBar;
