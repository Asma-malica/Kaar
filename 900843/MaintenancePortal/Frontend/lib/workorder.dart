import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:projectnithya/notifi_list.dart';

import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class WorkOrder extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WORK ORDER',
      theme:
          ThemeData(primarySwatch: Colors.red, brightness: Brightness.light),
      home: JsonDataGrid(),
    );
  }
}

class JsonDataGrid extends StatefulWidget {
  @override
  _JsonDataGridState createState() => _JsonDataGridState();
}

class _JsonDataGridState extends State<JsonDataGrid> {
  late _JsonDataGridSource jsonDataGridSource;
  List<_Product> productlist = [];

  Future generateProductList() async {
    var response =
        await http.post(Uri.parse('http://localhost:3030/workorder'));
    var list =
        json.decode(response.body)['data227'].cast<Map<String, dynamic>>();
    productlist =
        await list.map<_Product>((json) => _Product.fromJson(json)).toList();
    jsonDataGridSource = _JsonDataGridSource(productlist);
    print(productlist);
    return productlist;
  }

  List<GridColumn> getColumns() {
    List<GridColumn> columns;
    columns = ([
      GridColumn(
        columnName: 'ORDERID',
        width: 200,
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.center,
          child: Text(
            'ORDERID',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'ACTIVITY',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(10),
          alignment: Alignment.center,
          child: Text(
            'ACTIVITY',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'SUB_ACTIVITY',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(10),
          alignment: Alignment.center,
          child: Text(
            'SUB_ACTIVITY',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'CONTROL_KEY',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'CONTROL_KEY',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'WORK_CNTR',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'WORK_CNTR',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'PLANT',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'PLANT',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
    ]);
    return columns;
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('WORK ORDER'),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.menu,
              color: Colors.white,
            ),
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => Notifi_list()));
            },
          )
        ],
      ),
      body: Container(
          child: FutureBuilder(
              future: generateProductList(),
              builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
                return snapshot.hasData
                    ? SfDataGrid(
                        source: jsonDataGridSource, columns: getColumns())
                    : Center(
                        child: CircularProgressIndicator(
                          strokeWidth: 3,
                        ),
                      );
              })),
    );
  }
}

class _Product {
  factory _Product.fromJson(Map<String, dynamic> json) {
    return _Product(
      ORDERID: json['ORDERID']['_text'],
      ACTIVITY: json['ACTIVITY']['_text'],
      SUB_ACTIVITY: json['SUB_ACTIVITY']['_text'],
      CONTROL_KEY: json['CONTROL_KEY']['_text'],
      WORK_CNTR: json['WORK_CNTR']['_text'],
      PLANT: json['PLANT']['_text'],
    );
  }

  _Product({
    this.ORDERID,
    this.ACTIVITY,
    this.SUB_ACTIVITY,
    this.CONTROL_KEY,
    this.WORK_CNTR,
    this.PLANT,
  });
  String? ORDERID;
  String? ACTIVITY;
  String? SUB_ACTIVITY;
  String? CONTROL_KEY;
  String? WORK_CNTR;
  String? PLANT;
}

class _JsonDataGridSource extends DataGridSource {
  _JsonDataGridSource(this.productlist) {
    buildDataGridRow();
  }

  List<DataGridRow> dataGridRows = [];
  List<_Product> productlist = [];

  void buildDataGridRow() {
    dataGridRows = productlist.map<DataGridRow>((dataGridRow) {
      return DataGridRow(cells: [
        DataGridCell<String>(columnName: 'ORDERID', value: dataGridRow.ORDERID),
        DataGridCell<String>(
            columnName: 'ACTIVITY', value: dataGridRow.ACTIVITY),
        DataGridCell<String>(
            columnName: 'SUB_ACTIVITY', value: dataGridRow.SUB_ACTIVITY),
        DataGridCell<String>(
            columnName: 'CONTROL_KEY', value: dataGridRow.CONTROL_KEY),
        DataGridCell<String>(
            columnName: 'WORK_CNTR', value: dataGridRow.WORK_CNTR),
        DataGridCell<String>(columnName: 'PLANT', value: dataGridRow.PLANT)
      ]);
    }).toList(growable: false);
  }

  @override
  List<DataGridRow> get rows => dataGridRows;

  @override
  DataGridRowAdapter buildRow(DataGridRow row) {
    return DataGridRowAdapter(cells: [
      Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(8.0),
        child: Text(
          row.getCells()[0].value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      ),
      Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(10.0),
        child: Text(
          row.getCells()[1].value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      ),
      Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(8.0),
        child: Text(
          row.getCells()[2].value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      ),
      Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(8.0),
        child: Text(
          row.getCells()[3].value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      ),
      Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(8.0),
        child: Text(
          row.getCells()[4].value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      ),
      Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(8.0),
        child: Text(
          row.getCells()[5].value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      ),
    ]);
  }
}
