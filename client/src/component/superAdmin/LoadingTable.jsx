import React from 'react';
import '../../style/loading_page_style.scss'

class LoadingTable extends React.Component {
    render() {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        return (
            <div className="generalTable" style={{ overflowX: 'hidden' }}>
                {
                    arr.map((num) => {
                        return (
                            <div key={num} className="loadingRowData loading">
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default LoadingTable;