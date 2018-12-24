import React from 'react';
import {featureTypes} from '../types';

const PopupContent = (props) => {
  let content;
  console.log(props.properties);
  let type = props.properties.featType || props.properties.type;
  switch (type) {
    case featureTypes.PHOTO:
      content = <React.Fragment><h5>  {props.properties.name}  </h5><img src={props.properties.popupContent} alt="" /></React.Fragment>;
      break;
    case featureTypes.VIDEO:
      content = <React.Fragment><h5> { props.properties.name } </h5> <div dangerouslySetInnerHTML={{ __html: props.properties.popupContent}}></div> </React.Fragment>;
      break;
    case featureTypes.FEATURE:
      content = <React.Fragment><h5> { props.properties.name } </h5><p> { props.properties.popupContent } </p></React.Fragment>;
      break;
    case featureTypes.HANAMI:
    case featureTypes.WISH:
      if (props.properties.popupContent) {
        content = <React.Fragment><h5> { props.properties.name } </h5><a href={props.properties.popupContent}>Info</a></React.Fragment>;
      } else {
        content = <React.Fragment><h5> { props.properties.name } </h5></React.Fragment>;
      }
      break;
    default:
      content = '<h5>' + props.properties.name + '</h5><p>' + props.properties.popupContent + '</p>';
      break;
  }
  // if (marker.hasOwnProperty('properties')) {
   let gmapLink = <React.Fragment><br /><a href={'https://maps.google.com/maps/@' + props.geometry.coordinates.join() + ',20z'}>GMap</a></React.Fragment>;
  // }
  // let className = TypesSrv.featureTypes[type].className;
  
return (
    <div className={''/*className*/} >
      { content }
      { gmapLink }
    </div>
  )
};

export default PopupContent;