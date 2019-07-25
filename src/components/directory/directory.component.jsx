import React from 'react';
import MenuItem from '../menu-item/menu-item.component.jsx';
import './directory.styles.scss';
import {connect} from 'react-redux';
import {selectDirectorySection} from '../../redux/directory/directory.selector';
import {createStructuredSelector} from 'reselect';


const Directory = ({sections}) => (  
  <div className='directory-menu'>
    {
      sections.map(({title, imageUrl, id, size, linkUrl}) => (  //...otherSectionProps
        <MenuItem key={id}                                              // {...otherSectionProps}
                  title={title}
                  size={size}
                  linkUrl={linkUrl}
                  imageUrl={imageUrl}/>))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection
})

export default connect(mapStateToProps)(Directory); 