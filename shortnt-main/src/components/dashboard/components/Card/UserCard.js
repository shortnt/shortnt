import React from 'react';
import { useEffect,useState } from 'react';
import PropTypes from 'components/dashboard/utils/propTypes';

import classNames from 'classnames';

import { Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

import Avatar from '../Avatar';

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);

  const [userData,setUserData] = useState({});

  useEffect(() => {
          fetch(process.env.REACT_APP_API+"socialuser/"+JSON.parse(localStorage.getItem("loginData")))
          .then((res)=>res.json())
          .then((data) => setUserData(data))
          .catch((error)=>console.log(error));

}, []);

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={userData.image} size={avatarSize} className="mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText>
          <small>{text}</small>
        </CardText>
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;