function ScoreBar({numberOfCompletedTasks, numberOfTasks}) {

    function width() {

        let width = 0;
        if (numberOfTasks === 0)
            return 'טרם נוצרו מטלות';
        else 
            width = (numberOfCompletedTasks/numberOfTasks) * 100;
        return `${width}%`;

    }




        // ARI - If i change width(), it removes the bar progress and only shows the text
        // TODO - I added these 2 funcs for you to split betwen the Bar and the Text
        // you can combine them if you'd like
    function widthValue() {
        let width = 0;
        if (numberOfTasks !== 0)
            width = (numberOfCompletedTasks / numberOfTasks) * 100;
        return `${width}%`;

    }
    function widthDescription() {
        if (numberOfTasks === 0)
            return 'טרם נוצרו מטלות';
        else
            return `מטלות ${numberOfTasks} מתוך ${numberOfCompletedTasks}`;
    }

    return (
            <div className='review-bar-and-score flex align-center row'>
                <div className='review-bar-out-of'>
                <div className='review-bar-score' style={{ width: width() }}></div>

                </div>
                <span className='score'>{width()}</span>
            </div>
    )
}
export default ScoreBar;