// import logo200Image from 'assets/img/logo/logo_200.png';
// import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/dashboard/components/SourceLink';
import React from 'react';
import {useEffect,useState} from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
} from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'components/dashboard/utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  // { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
  // {
  //   to: '/button-groups',
  //   name: 'button groups',
  //   exact: false,
  //   Icon: MdGroupWork,
  // },
  // { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  // { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  // {
  //   to: '/dropdowns',
  //   name: 'dropdowns',
  //   exact: false,
  //   Icon: MdArrowDropDownCircle,
  // },
  // { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  // { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  // { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  // { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  // { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  // { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];

const pageContents = [
  // { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  // {
  //   to: '/login-modal',
  //   name: 'login modal',
  //   exact: false,
  //   Icon: MdViewCarousel,
  // },
];


const navItemss=[
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
  { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  { to: '/widgets', name: 'widgets', exact: true, Icon: MdWidgets },
];

const numbers = [MdWidgets,MdInsertChart,MdWeb,MdDashboard,MdDashboard];

var navItems = [];


const bem = bn.create('sidebar');

const Sidebar = () => {

  const [userData,setUserData] = useState([]);
  const [len,setLen] = useState(0);
  const [log,setLog] = useState(localStorage.getItem('loginData'));
  const [tr, settr] = React.useState(true);
  const [loop, setLoop] = useState(0);


  const handleClick = () => {

    
    <Link to="/">  </Link>

    // window.scrollTo(0, 0);
    // let s = '';
    // for(let i=0;i<log.length;i++){
    //   if(i==0 || i==log.length-1){
    //     continue;
    //   }
    //   s+=log.charAt(i);

    // }

    // fetch(process.env.REACT_APP_API+"socialuser/"+s)
    // .then((res)=>res.json())
    // .then((data) => {
    //   fetch(process.env.REACT_APP_API+"folders/"+data.uid)
    //   .then((res)=>res.json())
    //   .then((data) => {
    //     setUserData(data)
    //     setLen(data.length)
    //     console.log("testing....")
    //     })
    //   .catch((error)=>console.log(error));
    // })
    // .catch((err)=> console.log(err))
  };


  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   let s = '';
  //   for(let i=0;i<log.length;i++){
  //     if(i==0 || i==log.length-1){
  //       continue;
  //     }
  //     s+=log.charAt(i);

  //   }

  //   fetch(process.env.REACT_APP_API+"socialuser/"+s)
  //   .then((res)=>res.json())
  //   .then((data) => {
  //     fetch(process.env.REACT_APP_API+"folders/"+data.uid)
  //     .then((res)=>res.json())
  //     .then((data) => {
  //       setUserData(data)
  //       setLen(data.length)
  //       console.log("testing....")
  //       settr(false)
  //       console.log(data)
  //       for(var i = 0; i < 5; i++){
  //         navItems.push({
  //               to: 'dash/files/'+userData[i].folder_title+'/'+userData[i].folder_id ,
  //               name: userData[i].folder_title,
  //               exact:true,
  //               Icon: numbers[i],
  //           });
  //       };

  //       })
  //     .catch((error)=>console.log(error));
  //   })
  //   .catch((err)=> console.log(err))

  // },[]);
  

  // if(tr===true){
  //   window.scrollTo(0, 0);
  //   let s = '';
  //   for(let i=0;i<log.length;i++){
  //     if(i==0 || i==log.length-1){
  //       continue;
  //     }
  //     s+=log.charAt(i);

  //   }

  //   fetch(process.env.REACT_APP_API+"socialuser/"+s)
  //   .then((res)=>res.json())
  //   .then((data) => {
  //     fetch(process.env.REACT_APP_API+"folders/"+data.uid)
  //     .then((res)=>res.json())
  //     .then((data) => {
  //       setUserData(data)
  //       setLen(data.length)
  //       console.log("testing....")
  //       settr(false)
  //       console.log(data)
  //       navItems = [];
  //       let i1=data.length-1;
  //       // while(c>)
  //       for(var c = 0; c <5; c++)
  //       {
  //         navItems.push({
  //           to: '/dash/files/'+userData[i1].folder_title+'/'+userData[i1].folder_id ,
  //           name: userData[i1].folder_title,
  //           exact:true,
  //           Icon: numbers[i1],
  //           });
  //           console.log(navItems[i1].to)
  //           i1--;

  //         };
  //       })
  //     .catch((error)=>console.log(error));
  //   })
  //   .catch((err)=> console.log(err))
  // }

  
    return (
      <>
        <aside className={bem.b()}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              {/* <img
                src=""
                width="40"
                height="30"
                className="pr-2"
                alt=""
              /> */}
              <span className="text-white">
                ShortNt
                {/* ShortNt <FaGithub /> */}
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')} 
              >
                <div>
                  <a href={`${to}`} >
                <BSNavLink
              
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
                </a>
                </div>
              </NavItem>
            ))}


{/* 
            <NavItem
              className={bem.e('nav-item')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Components</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={""}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSend className={bem.e('nav-item-icon')} />
                  <span className="">Contents</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem> */}
            {/* <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Pages</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
          </Nav>
        </div>
      </aside>
      </>
    );
  
}

export default Sidebar;
