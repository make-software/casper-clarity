import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import * as React from 'react';
import { observer } from 'mobx-react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';

import logo from '../img/logo-full.png';
import Pages from './Pages';
import Home from './Home';
import Accounts from './Accounts';
import Faucet from './Faucet';
import Explorer from './Explorer';
import BlockList from './BlockList';
import { PrivateRoute, RefreshableComponent, Title } from './Utils';
import AuthContainer from '../containers/AuthContainer';
import FaucetContainer from '../containers/FaucetContainer';
import ErrorContainer from '../containers/ErrorContainer';
import DagContainer from '../containers/DagContainer';
import BlockDetails from './BlockDetails';
import BlockContainer from '../containers/BlockContainer';
import DeployDetails from './DeployDetails';
import DeployContainer from '../containers/DeployContainer';
import Search from './Search';
import SearchContainer from '../containers/SearchContainer';
import DeployInfoListDetails from './DeployInfoListDetails';
import { DeployInfoListContainer } from '../containers/DeployInfoListContainer';
import AccountSelector from './AccountSelector';
import AccountSelectorContainer from '../containers/AccountSelectorContainer';
import ConnectedPeersContainer from '../containers/ConnectedPeersContainer';
import ConnectedPeers from './ConnectedPeers';
import { IoMdKey, IoIosWater, IoMdRocket } from 'react-icons/io';
import {
  FaMapMarkedAlt,
  FaSearch,
  FaNetworkWired,
  FaListUl,
  FaUsers
} from 'react-icons/fa';
import { FiLogOut, FiGrid } from 'react-icons/fi';
import { DeployContractsForm } from './DeployContracts';
import { DeployContractsContainer } from '../containers/DeployContractsContainer';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import Validators from './Validators';
import ValidatorsContainer from '../containers/ValidatorsContainer';
import { NetworkInfoContainer } from '../containers/NetworkInfoContainer';
import FaucetAsterix from '../img/faucet-asterix.svg';
import { Signer } from 'casper-client-sdk';
import ConnectButton from './ConnectButton';

// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

// MenuItem can define required roles, children, etc.
class MenuItem {
  constructor(
    public path: string,
    public label: string,
    public icon?: JSX.Element,
    public exact: boolean = false,
    public additionalIcon?: string
  ) {}

  toRoute() {
    return <NavLink item={this} key={this.path} />;
  }
}

class GroupedMenuItem {
  constructor(
    public id: string,
    public label: string,
    public icon: JSX.Element,
    public secondLevelChildren: MenuItem[]
  ) {}

  toRoute() {
    return (
      <li className="nav-item" key={this.id}>
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          aria-expanded="false"
          data-target={`#${this.id}`}
          aria-controls={this.id}
        >
          <div style={{ margin: '0 10px 0 20px' }}>{this.icon}</div>
          <span className="nav-link-text">{this.label}</span>
          <div className="sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id={`${this.id}`}
          aria-labelledby="headingOne"
          data-parent="#mainNav"
        >
          <nav className="sidenav-menu-nested nav">
            {this.secondLevelChildren.map(menuItem => menuItem.toRoute())}
          </nav>
        </div>
      </li>
    );
  }
}

const SideMenuIconSize = 18;

const SideMenuItems: (MenuItem | GroupedMenuItem)[] = [
  new MenuItem(
    Pages.Accounts,
    'Accounts',
    <IoMdKey fontSize={SideMenuIconSize} />
  ),
  new MenuItem(
    Pages.Faucet,
    'Faucet',
    <IoIosWater fontSize={SideMenuIconSize} />,
    false,
    FaucetAsterix
  ),
  new MenuItem(
    Pages.DeployContracts,
    'Deploy Contract',
    <IoMdRocket fontSize={SideMenuIconSize} />
  ),
  // new MenuItem(
  //   Pages.Explorer,
  //   'Explorer',
  //   <FaMapMarkedAlt fontSize={SideMenuIconSize} />
  // ),
  new MenuItem(Pages.Blocks, 'Blocks', <FiGrid fontSize={SideMenuIconSize} />),
  new MenuItem(
    Pages.Deploys,
    'Deploys',
    <FaListUl fontSize={SideMenuIconSize} />
  ),
  new MenuItem(
    Pages.Search,
    'Search',
    <FaSearch fontSize={SideMenuIconSize} />
  ),
  new MenuItem(
    Pages.Validators,
    'Validators',
    <FaUsers fontSize={SideMenuIconSize} />
  ),
  new MenuItem(
    Pages.ConnectedPeers,
    'Connected Peers',
    <FaNetworkWired fontSize={SideMenuIconSize} />
  )
  // new GroupedMenuItem(
  //   'clarityContracts',
  //   'Contracts',
  //   <FaFileContract fontSize={SideMenuIconSize} />,
  //   [new MenuItem(Pages.Vesting, 'Vesting')]
  // )
];

export interface AppProps {
  errors: ErrorContainer;
  auth: AuthContainer;
  faucet: FaucetContainer;
  dag: DagContainer;
  validatorsContainer: ValidatorsContainer;
  block: BlockContainer;
  deploy: DeployContainer;
  deployInfoList: DeployInfoListContainer;
  accountSelectorContainer: AccountSelectorContainer;
  connectedPeersContainer: ConnectedPeersContainer;
  search: SearchContainer;
  deployContractsContainer: DeployContractsContainer;
  networkInfoContainer: NetworkInfoContainer;
}

// The entry point for rendering.
export default class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div>
        <Navigation {...this.props} />
        <Content {...this.props} />
        <Footer {...this.props} />
      </div>
    );
  }

  componentDidMount() {
    // Initialise the sb-admin components. This is copied from sb-admin.js but
    // that alone couldn't be imported becuase it would run when this component
    // hasn't yet rendered.

    // Configure tooltips for collapsed side navigation (Bootstrap extension)
    // $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    //   template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    // })

    // Toggle the side navigation
    $('#sidenavToggler').click(function (e) {
      e.preventDefault();
      $('body').toggleClass('sidenav-toggled');
      $('.navbar-sidenav .nav-link-collapse').addClass('collapsed');
      $(
        '.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level'
      ).removeClass('show');
    });

    // Hide sidenav manually after clicking menu item in mobile view
    // $("#navbarResponsive") is a responsive component which can only collapsed
    // in mobile view.
    $('.navbar-sidenav .nav-item').click(function (e) {
      $('#navbarResponsive').collapse('hide');
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $(
      'body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse'
    ).on('mousewheel DOMMouseScroll', function (e: any) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    });

    // Scroll to top button appear
    $(document).scroll(function () {
      var scrollDistance = $(this).scrollTop()!;
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Scroll to top
    $(document).on('click', 'a.scroll-to-top', function (e) {
      var anchor = $(this);
      var offset = $(anchor.attr('href')!).offset()!;
      $('html, body').stop().animate(
        {
          scrollTop: offset.top
        },
        1000
      );
      e.preventDefault();
    });
  }
}

// NavLink checks whether the current menu is active.
const NavLink = (props: { item: MenuItem }) => {
  let item = props.item;
  // Based on https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js
  return (
    <Route
      path={item.path}
      exact={item.exact}
      children={props => {
        const cls = props.match ? 'active' : '';
        return (
          <li
            className={['nav-item', cls].filter(x => x).join(' ')}
            title={item.label}
            data-toggle="tooltip"
            data-placement="right"
          >
            <Link to={item.path} className="nav-link">
              <div style={{ margin: '0 10px 0 20px' }}>{item.icon}</div>
              <span className="nav-link-text">{item.label}</span>
              <img
                alt=""
                className="svg-additional"
                src={item.additionalIcon}
              />
            </Link>
          </li>
        );
      }}
    />
  );
};

// Render navigation.
// `withRouter` is necessary otherwise the menu links never detect changes:
// https://github.com/ReactTraining/react-router/issues/4781
// https://github.com/mobxjs/mobx-react/issues/210
// https://github.com/mobxjs/mobx-react/issues/274
// Moved `withRouter` to a separate line.
@observer
class _Navigation extends RefreshableComponent<
  AppProps & RouteComponentProps<any>,
  {}
> {
  // refresh every 10 seconds
  refreshIntervalMillis = 10000;
  async refresh() {
    this.props.connectedPeersContainer.refreshPeers();
    this.props.networkInfoContainer.refresh();
  }

  async signerConnectionStateText() {
    const result = await Signer.isConnected();
    const buttonText = result ? 'Connected' : 'Connect to Signer';
    return buttonText;
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" />
          <span className={'navbar-brand-title'}>
            Clarity Explorer <FaMapMarkedAlt className={'navbar-brand-icon'} />
          </span>
        </a>
        <div className="navbar-network-info d-none d-md-inline-block">
          <p>
            Connected to:&nbsp;
            <span className={'navbar-network-highlight'}>
              {window.config?.network?.name}&nbsp;
            </span>
            Block Height:&nbsp;
            <span className={'navbar-network-highlight'}>
              {this.props.networkInfoContainer.blockHeight}&nbsp;
            </span>
          </p>
          <p>
            Block Hash:&nbsp;
            <span className={'navbar-network-highlight'}>
              {this.props.networkInfoContainer.blockHash || 'null'}&nbsp;
            </span>
          </p>
        </div>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          {/* Side Bar */}
          <ul className="navbar-nav navbar-sidenav" id="sideMenu">
            {SideMenuItems.map(x => x.toRoute())}
          </ul>

          {/* Side Bar Toggle */}
          <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item">
              <a
                className="nav-link text-center"
                id="sidenavToggler"
                href={'/#'}
              >
                <i className="fa fa-fw fa-angle-left"></i>
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {this.props.auth.user && (
                <div className="username text-white">
                  <span className="welcome">Welcome</span>
                  {this.props!.auth!.user!.name}
                </div>
              )}
            </li>
            <li className="nav-item">
              {this.props.auth.user ? (
                <a
                  href={'/#'}
                  className="nav-link text-white"
                  onClick={_ => this.props.auth.logout()}
                >
                  <FiLogOut /> Sign Out
                </a>
              ) : (
                <a
                  href={'/#'}
                  className="nav-link text-center"
                  onClick={_ => this.props.auth.login()}
                >
                  <i className="fa fa-fw fa-sign-in-alt"></i>Sign In
                </a>
              )}
            </li>
            <li
              className="nav-item"
              style={{ paddingLeft: '1rem', paddingTop: '.3rem' }}
            >
              <ConnectButton auth={this.props.auth} />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

// If we used a decorator it would keep the Props signature,
// but this way it removes the ReactComponentProps
// so the calling component doesn't have to pass them.
const Navigation = withRouter(_Navigation);

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// The white list of hostname that enable GA.
const HOSTNAME_WHITE_LIST = [
  'testnet-explorer.casperlabs.io',
  'clarity.casperlabs.io'
];

const ENABLE_GA = HOSTNAME_WHITE_LIST.includes(window.location.hostname);

if (ENABLE_GA) {
  ReactGA.initialize('UA-133833104-1');
}

// the hook to send pageView to GA.
function usePageViews() {
  let location = useLocation();

  useEffect(() => {
    if (ENABLE_GA) {
      ReactGA.pageview(location.pathname);
    }
  }, [location]);
}

// Render the appropriate page.
const Content = (props: AppProps) => {
  let query = useQuery();
  usePageViews();
  return (
    <main>
      <div className="content-wrapper">
        <div className="container-fluid">
          <Alerts {...props} />
          <Switch>
            <Route exact path={Pages.Home}>
              <Title title="Home" />
              <Home {...props} />
            </Route>
            <Route path={Pages.DeploysOfAccount}>
              <Title title="Deploys" />
              <DeployInfoListDetails
                pageToken={query.get('pageToken')}
                page={query.get('page')}
                limit={query.get('limit')}
                {...props}
              />
            </Route>
            <PrivateRoute path={Pages.Accounts} auth={props.auth}>
              <Title title="Account Keys" />
              <Accounts {...props} />
            </PrivateRoute>
            <PrivateRoute path={Pages.Faucet} auth={props.auth}>
              <Title title="Faucet" />
              <Faucet {...props} />
            </PrivateRoute>
            <Route path={Pages.Explorer}>
              <Title title="Explorer" />
              <Explorer
                page={query.get('page')}
                limit={query.get('limit')}
                {...props}
              />
            </Route>
            <Route path={Pages.Block}>
              <Title title="Block Detail" />
              <BlockDetails {...props} />
            </Route>
            <Route path={Pages.Blocks}>
              <Title title="Blocks" />
              <BlockList
                page={query.get('page')}
                limit={query.get('limit')}
                {...props}
              />
            </Route>
            <Route path={Pages.Deploy}>
              <Title title="Deploy Detail" />
              <DeployDetails {...props} />
            </Route>
            <Route path={Pages.DeployContracts}>
              <Title title="Deploy Contract" />
              <DeployContractsForm {...props} />
            </Route>
            <Route path={Pages.Deploys}>
              <Title title={'Deploys'} />
              <AccountSelector {...props} />
            </Route>
            <Route path={Pages.Search}>
              <Title title="Search" />
              <Search {...props} />
            </Route>
            <Route path={Pages.Validators}>
              <Title title="Validators" />
              <Validators validatorsContainer={props.validatorsContainer} />
            </Route>
            <Route path={Pages.ConnectedPeers}>
              <Title title="Connected Peers" />
              <ConnectedPeers {...props} />
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  );
};

// Alerts displays the outcome of the last async error on the top of the page.
// Dismissing the error clears the state and removes the element.
const Alerts = observer((props: AppProps) => {
  if (props.errors.lastError == null) return null;
  // Not using the `data-dismiss="alert"` to dismiss via Bootstrap JS
  // becuase then it doesn't re-render when there's a new error.
  if (
    props.deploy.deploy === null &&
    props.deploy.deployHashBase16?.includes('deploy')
  )
    return (
      <div id="alert-message">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={_ => props.errors.dismissLast()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Error! Deploy not found</strong>
        </div>
      </div>
    );
  return (
    <div id="alert-message">
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={_ => props.errors.dismissLast()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>Error!</strong> {props.errors.lastError}
      </div>
    </div>
  );
});

const Footer = observer((props: AppProps) => {
  return (
    <section>
      <footer className="sticky-footer">
        <div className="container">
          <div className="text-center">
            <small>
              Get in touch on{' '}
              <a href="https://discordapp.com/invite/Q38s3Vh">Discord</a> or {}
              <a
                href="https://t.me/casperlabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
              <div className="d-block">
                Clarity build: {process.env.REACT_APP_GIT_SHA}
              </div>
              <div className="d-block">
                Node build: {props.networkInfoContainer.nodeBuildVersion}
              </div>
            </small>
            <small>
              <a
                href="https://casperlabs.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                CasperLabs Website
              </a>
            </small>
          </div>
        </div>
      </footer>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </section>
  );
});
