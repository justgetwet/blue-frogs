import ReactGoogleSheets from 'react-google-sheets'

class DataComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sheetLoaded: false,
    }
  }
  render() {
    const CLIENT_ID = 'cImZOjzAkmxZy3fkhL7iLOzi'
    const API_KEY =
      '804535200787-ppljhkef4vnnlnmmhes2q935dd7fcsh8.apps.googleusercontent.com'
    const SPREADSHEET_ID = '1f2ig-fIMuYAVEScYqdNmNuSmUCWrdeHxNwAONsr0O0I'
    return (
      <ReactGoogleSheets
        clientId={CLIENT_ID}
        apiKey={API_KEY}
        spreadsheetId={SPREADSHEET_ID}
        afterLoading={() => this.setState({ sheetLoaded: true })}
      >
        {this.state.sheetLoaded ? (
          <div>
            {/* Access Data
            {console.log(
              'Your sheet data : ',
              this.props.getSheetsData({ YOUR_SPREADSHEET_NAME })
            )} */}
            {/* Update Data */}
            <button
              onClick={() => {
                this.props.updateCell(
                  'sheet01', // sheetName
                  'E', // column
                  13, // row
                  'Apple', // value
                  null, // successCallback
                  (error) => {
                    console.log('error', error)
                  } // errorCallback
                )
              }}
            >
              update cell!
            </button>
          </div>
        ) : (
          'loading...'
        )}
      </ReactGoogleSheets>
    )
  }
}

export default ReactGoogleSheets.connect(DataComponent)
