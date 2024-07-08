function ScoreBar({score}) {

    function width() {
        let width = score * 20;
        return `${width}%`;
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