import React from 'react';
import { observer } from 'mobx-react';
import SearchContainer, { Target } from '../containers/SearchContainer';
import { Card, Button } from './Utils';
import { Form, TextField, ErrorMessage, RadioField } from './Forms';
import {
  BlockInfo,
  DeployInfo
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/info_pb';
import { Redirect } from 'react-router';
import Pages from './Pages';
import { encodeBase16 } from 'casperlabs-sdk';

interface Props {
  search: SearchContainer;
}

@observer
class Search extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.search.reset();
  }

  render() {
    return (
      <div>
        <SearchForm container={this.props.search} />
        <Results container={this.props.search} />
      </div>
    );
  }
}

const SearchForm = observer((props: { container: SearchContainer }) => {
  const form = props.container.searchForm;
  const submit = () => props.container.search();
  return (
    <Card title="Search">
      <Form onSubmit={submit}>
        <RadioField
          id="id-search-target"
          label="Target"
          options={Object.keys(Target)
            .filter(x => isNaN(Number(x)))
            .map(x => ({ label: x, value: x }))}
          value={Target[form.target]}
          onChange={x => (form.target = Target[x as keyof typeof Target])}
        />
        <TextField
          id="id-search-hash-base16"
          label="Hash (Base16)"
          fieldState={form.hashBase16}
        />
        <ErrorMessage error={form.error} />
      </Form>
      <Button title="Submit" onClick={submit} />
    </Card>
  );
});

const Results = observer((props: { container: SearchContainer }) => {
  const result = props.container.result;
  if (result == null) return null;

  if (typeof result === 'string') return <ErrorMessage error={result} />;

  if (result instanceof BlockInfo) {
    const hash = encodeBase16(result.getSummary()!.getBlockHash_asU8());
    return <Redirect to={Pages.block(hash)} />;
  }

  if (result instanceof DeployInfo) {
    const hash = encodeBase16(result.getDeploy()!.getDeployHash_asU8());
    return <Redirect to={Pages.deploy(hash)} />;
  }

  return <ErrorMessage error={`Don't know how to display ${typeof result}`} />;
});

export default Search;
