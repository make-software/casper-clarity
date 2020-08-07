import React from 'react';
import $ from 'jquery';
import { observer } from 'mobx-react';

interface Props {
  id: string;
  title: string;
  submitLabel?: string;
  // Submit, then return if the windows can be closed.
  onSubmit: () => Promise<boolean>;
  onClose: () => void;
  // Display any feedback after submission or editing.
  error?: any;
  success?: any;
  // The body should be inside the <Modal></Modal>
  children?: any;
}

@observer
export default class Modal extends React.Component<Props, {}> {
  render() {
    return (
      <div className="modal fade" id={this.props.id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.children}
              {this.props.error && (
                <div className="alert alert-danger" role="alert">
                  {this.props.error}
                </div>
              )}
              {this.props.success && (
                <div className="alert alert-success" role="alert">
                  {this.props.success}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={_ => this.submit()}
              >
                {this.props.submitLabel || 'Submit'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    $('#' + this.props.id).modal('show');
    $('#' + this.props.id).on('hidden.bs.modal', _ => {
      // Clear whatever state triggered showing the modal.
      this.props.onClose();
    });
  }

  submit() {
    this.props.onSubmit().then(close => {
      if (close) {
        $('#' + this.props.id).modal('hide');
      }
    });
    // .fail() is expected to set the error message on the props.
  }
}
