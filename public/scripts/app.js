function enumFormatter(cell, row, enumObject) {
    return enumObject[cell];
}

var genderType = {
    "Female": "Female",
    "Male": "Male"
};

var Table = React.createClass({

    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: '' } }>
                From { (start + 1) } to { (to + 1) }, total { total }&nbsp; &nbsp;
            </p>
        );
    },
    onPageChange(page, sizePerPage) {
        console.log(page);
        console.log(sizePerPage);
    },
    csvFormatter(cell, row) {
        return `mailto: ${cell}`;
    },
    render: function () {

        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [5, 20], // you can change the dropdown list for size per page
            sizePerPage: 20,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            onPageChange: this.onPageChange,
            hideSizePerPage: true, // You can hide the dropdown for sizePerPage
            //afterSearch: afterSearch,  //(searchText, result) define a after search hook,
            clearSearch: true
        };

        return (
            <div className="table">
                <BootstrapTable data={this.state.data} striped={true} hover={true} exportCSV={ true } search={true} pagination={true} options={options}>
                    <TableHeaderColumn isKey={true} dataField="id"
                        filter={{ type: "TextFilter", placeholder: "Enter a ID" }}>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="gender" csvHeader='Gender'
                        filter={{ type: "SelectFilter", options: genderType }}
                        dataFormat={ enumFormatter }
                        formatExtraData={genderType}>
                        Gender
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="first_name" csvHeader='First Name'
                        filter={{ type: "TextFilter", placeholder: "Enter a name" }}>
                        First Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="last_name" csvHeader='Last Name'
                        filter={{ type: "TextFilter", placeholder: "Enter a last name" }}>
                        Last Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="email" csvHeader='Email'
                        filter={{ type: "TextFilter", placeholder: "Enter a email" }}
                        csvFormat={ this.csvFormatter }>
                        Email
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
});

var url = "https://raw.githubusercontent.com/RodrigoLimasss/json-to-test/master/Person_Mock_Data.json";

ReactDOM.render(
    <Table url={url} />,
    document.getElementById("content")
);