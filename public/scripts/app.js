function enumFormatter(cell, row, enumObject) {
    console.log("cell: " + cell);
    console.log("row: " + row);
    console.log("enumObject: " + enumObject);
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
    render: function () {

        return (
            <div className="table">
                <BootstrapTable data={this.state.data} striped={true} hover={true} search={true} pagination={true}>
                    <TableHeaderColumn isKey={true} dataField="id"
                        filter={{ type: "TextFilter", placeholder: "Enter a ID" }}>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="gender"
                        filter={{ type: "SelectFilter", options: genderType }}
                        dataFormat={ enumFormatter }
                        formatExtraData={genderType}>
                        Gender
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="first_name"
                        filter={{ type: "TextFilter", placeholder: "Enter a name" }}>
                        First Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="last_name"
                        filter={{ type: "TextFilter", placeholder: "Enter a last name" }}>
                        Last Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="email"
                        filter={{ type: "TextFilter", placeholder: "Enter a email" }}>
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