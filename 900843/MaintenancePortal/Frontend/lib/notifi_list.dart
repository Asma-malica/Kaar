import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

import 'workorder.dart';

class Notifi_list extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NOTIFICATION LIST',
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
    var response = await http.post(Uri.parse('http://localhost:3030/notlist'));
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
        columnName: 'NOTIFICATION NUMBER',
        width: 200,
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.center,
          child: Text(
            'NOTIFICATION NO',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
       GridColumn(
        columnName: 'SHORT TEXT',
       
       
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'SHORT TEXT',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'DESCRIPTION OF TECH OBJ',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'DESCRIPTION OF TECH OBJ',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'NOTIFDATE',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'NOTIFDATE',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'NOTIFTIME',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'NOTIFTIME',
            overflow: TextOverflow.ellipsis,
            softWrap: true,
          ),
        ),
      ),
      GridColumn(
        columnName: 'STARTDATE',
        width: 200,
        label: Container(
          padding: EdgeInsets.all(8),
          alignment: Alignment.center,
          child: Text(
            'STARTDATE',
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
        title: Text('NOTIFICATION LIST'),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.menu,
              color: Colors.white,
            ),
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => WorkOrder()));
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
      NOTIFICAT: json['NOTIFICAT']['_text'],
      DESCRIPT: json['DESCRIPT']['_text'],
      EQUIDESCR: json['EQUIDESCR']['_text'],
      NOTIFDATE: json['NOTIFDATE']['_text'],
      NOTIFTIME: json['NOTIFTIME']['_text'],
      STARTDATE: json['STARTDATE']['_text'],
    );
  }

  _Product({
    this.NOTIFICAT,
    this.DESCRIPT,
    this.EQUIDESCR,
    this.NOTIFDATE,
    this.NOTIFTIME,
    this.STARTDATE,
  });
  String? NOTIFICAT;
  String? DESCRIPT;
  String? EQUIDESCR;
  String? NOTIFDATE;
  String? NOTIFTIME;
  String? STARTDATE;
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
        DataGridCell<String>(
            columnName: 'NOTIFICAT', value: dataGridRow.NOTIFICAT),
        DataGridCell<String>(
            columnName: 'DESCRIPTION', value: dataGridRow.DESCRIPT),
        DataGridCell<String>(
            columnName: 'EQUIDESCR', value: dataGridRow.EQUIDESCR),
        DataGridCell<String>(
            columnName: 'NOTIFDATE', value: dataGridRow.NOTIFDATE),
        DataGridCell<String>(
            columnName: 'NOTIFTIME', value: dataGridRow.NOTIFTIME),
        DataGridCell<String>(
            columnName: 'STARTDATE', value: dataGridRow.STARTDATE),
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
        padding: EdgeInsets.all(8.0),
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
