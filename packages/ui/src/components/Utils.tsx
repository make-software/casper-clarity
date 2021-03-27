import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import AuthContainer from '../containers/AuthContainer';
import { encodeBase16 } from 'casper-client-sdk';
import { Helmet } from 'react-helmet';
import { BigNumber } from '@ethersproject/bignumber';

export const Spinner = (msg: String) => (
  <div className="text-center">
    <i className="fa fa-fw fa-spin fa-spinner" />
    {msg}...
  </div>
);

export const Loading = () => Spinner('Loading');

// https://fontawesome.com/icons?d=gallery&q=ground&m=free
export const Icon = (props: {
  name: string;
  color?: string;
  title?: string;
}) => {
  const styles = {
    color: props.color
  };
  return (
    <i
      className={'fa fa-fw fa-' + props.name}
      style={styles}
      title={props.title}
    />
  );
};

export const SuccessIcon = () => <Icon name="check-circle" color="green" />;
export const FailIcon = () => <Icon name="times-circle" color="red" />;

export const IconButton = (props: {
  onClick: () => void;
  title: string;
  icon: string;
}) => (
  <button
    onClick={_ => props.onClick()}
    title={props.title}
    className="link icon-button"
  >
    <Icon name={props.icon} />
  </button>
);

export const RefreshButton = (props: { refresh: () => void }) => (
  <IconButton onClick={() => props.refresh()} title="Refresh" icon="redo" />
);

export const Button = (props: {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  type?: 'primary' | 'danger' | 'secondary' | 'success';
  size?: 'lg' | 'sm' | 'xs';
}) => (
  <button
    type="button"
    onClick={_ => props.onClick()}
    className={`btn ${props.size ? `btn-${props.size}` : ''} btn-${
      props.type || 'primary'
    }`}
    disabled={props.disabled || false}
  >
    {props.title}
  </button>
);

export const LinkButton = (props: { onClick: () => void; title: string }) => (
  <button className="link" onClick={() => props.onClick()}>
    {props.title}
  </button>
);

export const ListInline = (props: { children: any }) => {
  const children = [].concat(props.children);
  return (
    <ul className="list-inline mb-0">
      {children.map((child: any, idx: number) => (
        <li key={idx} className="list-inline-item">
          {child}
        </li>
      ))}
    </ul>
  );
};

// RefreshableComponent calls it's `refresh()` when it
// has mounted where it should get data from the server.
// It should either then use `setState` or wait for MobX
// to notify it of any changes. We can also call this
// method from the callback of a refresh button, or
// add a method here to start a timer which should be
// stopped in `componentWillUnmount`.
export abstract class RefreshableComponent<P, S> extends React.Component<P, S> {
  abstract refresh(): void;

  protected refreshIntervalMillis: number = 0;
  protected timerId: number = 0;

  // See all lifecycle methods at https://reactjs.org/docs/react-component.html
  componentDidMount() {
    this.refresh();
    if (this.refreshIntervalMillis > 0) {
      this.timerId = window.setInterval(
        () => this.refresh(),
        this.refreshIntervalMillis
      );
    }
  }

  componentWillUnmount() {
    if (this.timerId !== 0) {
      window.clearInterval(this.timerId);
    }
  }
}

export const UnderConstruction = (props: { children: any }) => {
  return (
    <div className="card shadow mb-3">
      <div className="card-header bg-warning">
        <h4 className="card-title font-weight-bold text-white">
          Under construction
        </h4>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export const CommandLineHint = (props: { children: any }) => {
  return (
    <div className="card shadow mb-3">
      <div className="card-header bg-info">
        <h5 className="card-title font-weight-bold text-white">
          <Icon name="terminal" />
        </h5>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export const CLX = (props: { amount: number }) => {
  return <span>{props.amount.toLocaleString()} CLX</span>;
};

interface PrivateRouteProps extends RouteProps {
  auth: AuthContainer;
}

@observer
export class PrivateRoute extends React.Component<PrivateRouteProps, {}> {
  render() {
    if (this.props.auth.user == null) {
      this.props.auth.login();
      return Spinner('Logging in');
    }
    return <Route {...this.props} />;
  }
}

export const shortHash = (hash: string | ByteArray) => {
  const h = typeof hash === 'string' ? hash : encodeBase16(hash);
  return h.length > 10 ? h.substr(0, 10) + '...' : h;
};

export const Card = (props: {
  title: string;
  children: any;
  footerMessage?: any;
  refresh?: () => void;
  accordionId?: string;
}) => {
  let cardHeader = (
    <div>
      <a className="card-title" href={'/#'}>
        {props.title}
      </a>
      <div className="float-right">
        {props.refresh && <RefreshButton refresh={() => props.refresh!()} />}
      </div>
    </div>
  );
  return (
    <div className={`card mb-3 ${props.accordionId ? 'accordion' : 'ac'}`}>
      {props.accordionId ? (
        <div
          className="card-header"
          id={`collapse-header-${props.accordionId}`}
          data-toggle="collapse"
          data-target={`#${props.accordionId}`}
          aria-expanded="true"
          aria-controls={props.accordionId}
        >
          {cardHeader}
        </div>
      ) : (
        <div className="card-header">{cardHeader}</div>
      )}
      {props.accordionId ? (
        <div id={`${props.accordionId}-parent`}>
          <div
            id={props.accordionId}
            className="collapse show"
            aria-labelledby={`collapse-header-${props.accordionId}`}
            data-parent={`#${props.accordionId}-parent`}
          >
            <div className="card-body">{props.children}</div>
          </div>
        </div>
      ) : (
        <div className="card-body">{props.children}</div>
      )}
      {props.footerMessage && (
        <div className="card-footer small text-muted">
          {props.footerMessage}
        </div>
      )}
    </div>
  );
};

export const Title = (props: { title: string }) => (
  <Helmet>
    <title>CasperLabs Clarity - {props.title}</title>
  </Helmet>
);

/**
 * Note, that since we are dealing with money-like entity using float mey be dangerous
 * and tools). Depending on the domain it may be need to use a decimal-like type.
 * See here for the reference https://dev.mysql.com/doc/refman/5.7/en/precision-math-decimal-characteristics.html
 *
 * @param numerator
 * @param denominator
 * @param precision
 */
export const divBigNumbersWithPrecision = (
  numerator: BigNumber | String,
  denominator: BigNumber | String,
  precision: number
): number => {
  const convertedNumerator = BigNumber.from(numerator);
  const convertedDenominator = BigNumber.from(denominator);
  const precisionMultiplier = Math.pow(10, precision);

  let wholeQuotient, fractionQuotient, remainder;

  if (convertedNumerator.gte(convertedDenominator)) {
    wholeQuotient = convertedNumerator.div(convertedDenominator);
    if (wholeQuotient.gte(Number.MAX_SAFE_INTEGER - 1)) {
      throw new Error(
        "Couldn't divide with precision because the result doesn't fit into the Number type. Returning BigNumber."
      );
    }

    remainder = convertedNumerator.sub(convertedDenominator.mul(wholeQuotient));
    fractionQuotient = remainder
      .mul(precisionMultiplier)
      .div(convertedDenominator);

    return (
      wholeQuotient.toNumber() +
      fractionQuotient.toNumber() / precisionMultiplier
    );
  } else {
    fractionQuotient = convertedNumerator
      .mul(precisionMultiplier)
      .div(convertedDenominator);

    return fractionQuotient.toNumber() / precisionMultiplier;
  }
};

export const divBigNumbersWithPrecisionAsString = (
  numerator: BigNumber | String,
  denominator: BigNumber | String,
  precision: number
): String => {
  const convertedNumerator = BigNumber.from(numerator);
  const convertedDenominator = BigNumber.from(denominator);
  const precisionMultiplier = Math.pow(10, precision);

  let wholeQuotient, fractionQuotient, remainder, fractionContainer;

  if (convertedNumerator.gte(convertedDenominator)) {
    wholeQuotient = convertedNumerator.div(convertedDenominator);

    remainder = convertedNumerator.sub(convertedDenominator.mul(wholeQuotient));
    fractionQuotient = remainder
      .mul(precisionMultiplier)
      .div(convertedDenominator);

    fractionContainer = BigNumber.from(precisionMultiplier).add(
      fractionQuotient
    );

    return (
      wholeQuotient.toString() +
      (fractionQuotient.eq(0)
        ? ''
        : '.' + fractionContainer.toString().slice(1))
    );
  } else {
    fractionQuotient = convertedNumerator
      .mul(precisionMultiplier)
      .div(convertedDenominator);

    return (
      '0.' +
      BigNumber.from(precisionMultiplier)
        .add(fractionQuotient)
        .toString()
        .slice(1)
    );
  }
};

export const motesToCspr = (
  motes: BigNumber | String,
  precision: number = 0
): number => {
  const motesToCsprRate = BigNumber.from(1000_000_000);

  return precision === 0
    ? BigNumber.from(motes).div(motesToCsprRate).toNumber()
    : divBigNumbersWithPrecision(
        BigNumber.from(motes),
        motesToCsprRate,
        precision
      );
};

export const CSPR = (props: { motes: BigNumber; precision?: number }) => {
  const motesToCsprRate = BigNumber.from(1000_000_000);
  const csprStr = divBigNumbersWithPrecisionAsString(
    props.motes,
    motesToCsprRate,
    props.precision ? props.precision : 0
  );

  return <span>{csprStr} CSPR</span>;
};
