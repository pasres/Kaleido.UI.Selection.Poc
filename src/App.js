import React from "react";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Pager
} from "devextreme-react/data-grid";
import RadioGroup from "devextreme-react/radio-group";

import service from "./data.js";

const saleAmountEditorOptions = { format: "currency", showClearButton: true };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
    this.contacts = service.getContacts().then((contacts) => {
      console.log("contacts from fetch: ", contacts);
      this.setState({ contacts: contacts });
    });
    this.applyFilterTypes = [
      {
        key: "auto",
        name: "Immediately"
      },
      {
        key: "onClick",
        name: "On Button Click"
      }
    ];
    this.labelTypes = ["CONNECT", "SEXTANT.NET", "Salesforce"];
    this.state = {
      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: this.applyFilterTypes[0].key,
      currentLabelType: "CONNECT"
    };
    this.dataGrid = null;
    this.onShowFilterRowChanged = this.onShowFilterRowChanged.bind(this);
    this.onShowHeaderFilterChanged = this.onShowHeaderFilterChanged.bind(this);
    this.onCurrentFilterChanged = this.onCurrentFilterChanged.bind(this);
    this.onLabelTypeChanged = this.onLabelTypeChanged.bind(this);
  }

  render() {
    return (
      <div>
        <div className="dx-fieldset">
          <div className="dx-field">
            <div className="dx-field-label" style={{ textAlign: "right" }}>
            Eigenschaftsnamen: </div>
            <div className="dx-field-value">
              <RadioGroup
                items={this.labelTypes}
                defaultValue={"CONNECT"}
                layout="horizontal"
                onValueChanged={this.onLabelTypeChanged}
              />
            </div>
          </div>
        </div>
        <DataGrid
          id="gridContainer"
          ref={(ref) => {
            this.dataGrid = ref;
          }}
          dataSource={this.state.contacts}
          keyExpr="id"
          showBorders={true}
        >
          <FilterRow
            visible={this.state.showFilterRow}
            applyFilter={this.state.currentFilter}
          />
          <HeaderFilter visible={this.state.showHeaderFilter} />
          <SearchPanel visible={true} width={240} placeholder="Search..." />
          <Column dataField="salutation" width={140} caption="Anrede"></Column>
          <Column
            dataField="first_name"
            alignment="right"
            dataType="string"
            width={120}
            caption="Vorname"
          ></Column>
          <Column
            dataField="last_name"
            alignment="right"
            dataType="string"
            width={180}
            caption="Nachname"
          />
          <Column
            dataField="status"
            alignment="right"
            dataType="number"
            format="currency"
            editorOptions={saleAmountEditorOptions}
          >
            <HeaderFilter dataSource={this.saleAmountHeaderFilter} />
          </Column>
          <Column dataField="age" caption="Alter" />
          <Column
            dataField="level"
            caption={
              this.state.labelType === "SEXTANT.NET" ? "Partnerstufe" : "Level"
            }
          >
            <HeaderFilter allowSearch={true} />
          </Column>
          <Pager
            visible={true}
            showPageSizeSelector={true}
            showInfo={true}
            showNavigationButtons={true}
          />
        </DataGrid>
      </div>
    );
  }

  onShowFilterRowChanged(e) {
    this.setState({
      showFilterRow: e.value
    });
    this.clearFilter();
  }

  onShowHeaderFilterChanged(e) {
    this.setState({
      showHeaderFilter: e.value
    });
    this.clearFilter();
  }

  onCurrentFilterChanged(e) {
    this.setState({
      currentFilter: e.value
    });
  }

  onLabelTypeChanged(e) {
    this.setState({
      labelType: e.value
    });
  }

  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }
}

export default App;
