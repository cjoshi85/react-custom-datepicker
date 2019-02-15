Customized DatePicker with option of dropdown and calendar view by just passing the type attribute.

**Getting Started**

######Install
npm install react-custom-datepicker --save
or

yarn add react-custom-datepicker

######Import

import DatePicker from 'react-custom-datepicker';

######Dependencies

moment

######Datepicker

```
import React, { Component } from 'react';
import DatePicker from './DatePicker';
class App extends Component {

  onChange = (date) => {
    alert(date);
  }
  render() {
    return (
      <DatePicker onChange={this.onChange} type='calendar'/>
    );
  }
}
```

Here type can have two values (calendar and dropdown)

![Calendar_view](screenshot.JPG?raw=true "calendar")
![Dropdown_view](screenshot1.JPG?raw=true "calendar")