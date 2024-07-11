import React from 'react';

function ScoreBar({ numberOfCompletedTasks, numberOfTasks }) {

    const calculateWidth = () => {
        if (numberOfTasks === 0) {
            return 'טרם נוצרו מטלות';
        } else {
            return `${(numberOfCompletedTasks / numberOfTasks) * 100}%`;
        }
    };

    const width = calculateWidth();

    return (
        <div className='review-bar-and-score flex align-center row'>
            {numberOfTasks !== 0 ? (
                <>
                    <div className='review-bar-out-of'>
                        <div className='review-bar-score' style={{ width }}></div>
                    </div>
                    <span className='score'>{width}</span>
                </>
            ) : (
                <span className='no-tasks-indicator'>טרם נוצרו מטלות</span>
            )}
        </div>
    );
}

export default ScoreBar;
