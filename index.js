import React, { Component } from "react";
import ReactDOM from "react-dom";
import { configureAmplify, SetS3Config } from "./services";
import Storage from "@aws-amplify/storage";
import "./styles.css";

class App extends Component {
  state = {
    imageName: "",
    imageFile: "",
    response: ""
  };

  uploadImage = () => {
    SetS3Config("my-test-bucket-amplify", "protected");
    Storage.put(`userimages/${this.upload.files[0].name}`,
                this.upload.files[0],
                { contentType: this.upload.files[0].type })
      .then(result => {
        this.upload = null;
        this.setState({ response: "Success uploading file!" });
      })
      .catch(err => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
  };

  render() {
    return (
      <div className="App">
        <h2>S3 Upload example...</h2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          ref={ref => (this.upload = ref)}
          onChange={e =>
            this.setState({
              imageFile: this.upload.files[0],
              imageName: this.upload.files[0].name
            })
          }
        />
        <input value={this.state.imageName} placeholder="Select file" />
        <button
          onClick={e => {
            this.upload.value = null;
            this.upload.click();
          }}
          loading={this.state.uploading}
        >
          Browse
        </button>

        <button onClick={this.uploadImage}> Upload File </button>

        {!!this.state.response && <div>{this.state.response}</div>}
      </div>
    );
  }
}

configureAmplify();
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
