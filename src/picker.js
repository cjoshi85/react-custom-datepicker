import React from 'react';
import moment from 'moment';
import './style.css';

export default class Picker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: 'Day',
            month: 'Month',
            year: 'Year',
            selectDate: '',
            tags: 'option',
            monthCalendar: null,
            next: null,
            previous: null,
            label: null,
            activeDates: null,
            dateCalendar: new Date(),
            todaysDate: new Date(),
            list_months : [
                'Month',
                'January',
                'Febuary',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        }
      }
    async componentDidMount(){
        //Initializing the default values
        var i,l,months="",years="";
        var dates = "";
        const {tags,list_months} = this.state;

        // Creating the date select option
        if(this.props.type === 'dropdown'){
            dates += "<" + tags +">Day</" + tags +">";
            for (i = 1; i < 32;  i++ )
            {
                dates += "<" + tags +">" + i +"</" + tags +">";
            }	
            
            //Inserting date data into the html code				
            var multiple_list = document.getElementsByClassName("dates");
            for (i = 0; i < multiple_list.length; i++)
            {
                multiple_list[i].innerHTML = dates;
            }
    
            //Creating the month data
            for (i = 0, l = list_months.length, months = ""; i < l; i++)
            {
                months += "<" + tags +">" + list_months[i] + "</" + tags +">";
            }
            //Inserting month data into the html code
            multiple_list = document.getElementsByClassName("months");
            for (i = 0; i < multiple_list.length; i++)
            {
                multiple_list[i].innerHTML = months;
            }
    
            //Creating the Year data
            years += "<" + tags +">Year</" + tags +">";
            for (i = 1900; i < 3000 + 1;  i++ )
            {
                years += "<" + tags +">" + i +"</" + tags +">";
            }	
            
            //Inserting the year data into the html
            multiple_list = document.getElementsByClassName("years")
            for (i = 0; i < multiple_list.length; i++)
            {
                multiple_list[i].innerHTML = years;
            }    
        }

        else if(this.props.type === 'calendar'){
           await this.setState ({
                monthCalendar: document.getElementsByClassName('calendar-month')[0],
                next: document.querySelectorAll('[calendar-month="next"]')[0],
                previous: document.querySelectorAll('[calendar-month="previous"]')[0],
                label: document.getElementsByClassName('calendar-month-label')[0]
            })
            this.state.dateCalendar.setDate(1)
            this.monthCalendar()
            this.createListeners()
        }
      }

    // Method to handle the change event on date
    handleChange = (event,type) => {
        this.setState({
          [type]:event.target.value
        })
        this.checkDate(event.target.value,type);
    }

    createListeners = () => {
        const {next,previous,dateCalendar} = this.state
        var _this = this
        next.addEventListener('click', function () {
          _this.clearCalendar()
          var nextMonth = dateCalendar.getMonth() + 1
          dateCalendar.setMonth(nextMonth)
          _this.monthCalendar()
        })
        // Clears the calendar and shows the previous month
        previous.addEventListener('click', function () {
          _this.clearCalendar()
          var prevMonth = dateCalendar.getMonth() - 1
          dateCalendar.setMonth(prevMonth)
          _this.monthCalendar()
        })
  
      }

    dayCalendar = (num, day) => {
        const {dateCalendar,todaysDate,monthCalendar} = this.state
        var newDay = document.createElement('div')
        var dateEl = document.createElement('span')
        dateEl.innerHTML = num
        newDay.className = 'calendar-date'   
        newDay.setAttribute('data-calendar-date', dateCalendar) 
        // if it's the first day of the month
        if (num === 1) {
          if (day === 0) {
            newDay.style.marginLeft = (6 * 14.28) + '%'
          } else {
            newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
          }
        }
          newDay.classList.add('calendar-date-active') 
        if (dateCalendar.toString() === todaysDate.toString()) {
          newDay.classList.add('calendar-date-today')
        }
        newDay.appendChild(dateEl)
        monthCalendar.appendChild(newDay)
    }

    dateClicked = () => {
        var classname = document.getElementsByClassName("calendar-date-active");
        var _this = this
        for (var i = 0; i < classname.length; i++) {
          classname[i].addEventListener('click', function(s){
              _this.setState({
                  activeDates: classname
              }) 
              _this.removeActiveClass()
              _this.props.onChange(moment(s.currentTarget.dataset.calendarDate).format())
              s.currentTarget.classList.add('calendar-date-selected')
              //classname[i].classList.add('calendar-date-selected')
          });
      }
      }

    monthCalendar = () => {
        const {dateCalendar,label} = this.state
        var currentMonth = dateCalendar.getMonth()
        while (dateCalendar.getMonth() === currentMonth) {
            this.dayCalendar(
            dateCalendar.getDate(),
            dateCalendar.getDay()
            )
            dateCalendar.setDate(dateCalendar.getDate() + 1)
        }
        // Set the date and month as previous after the loop is over
        dateCalendar.setDate(1)
        dateCalendar.setMonth(dateCalendar.getMonth() - 1)      
        label.innerHTML = this.findMonth(dateCalendar.getMonth()) + ' ' + dateCalendar.getFullYear()
        this.dateClicked()
    }

    findMonth = (monthIndex) => {
        return this.state.list_months[monthIndex+1]
    }
    
    clearCalendar = () => {
        const monthCalendar = this.state.monthCalendar
        monthCalendar.innerHTML = ''
    }
      
    removeActiveClass = () => {
        const activeDates = this.state.activeDates
        for (var i = 0; i < activeDates.length; i++) {
          activeDates[i].classList.remove('calendar-date-selected')
        }
      }
    
    // Method to check the select date is valid
    checkDate = (value,type) => {
        var {date,month,year} = this.state;
        if(type === 'date'){
            date = value;
        }
        else if(type === 'month'){
            month = value;
        }
        else if(type === 'year'){
            year = value;
        }
        
        if(date === 'Day' || month === 'Month' || year === 'Year'){
            return null;
        }
        else {  
            const obj = date+'-'+month+'-'+year;
            this.props.onChange(moment(obj).format())
        }
    }
    
    render() {
        if(this.props.type === 'dropdown'){
            return (
                <div className="container">
                    <select className="dates" defaultValue='date' onChange={(e)=>this.handleChange(e,'date')}></select>
                    <select className="months" defaultValue='month' onChange={(e)=>this.handleChange(e,'month')}></select>
                    <select className="years"  defaultValue='year' onChange={(e)=>this.handleChange(e,'year')}></select>
                </div>
            );
        }
        else if(this.props.type === 'calendar'){
            return(
                <div id="calendar">
                  <div className="calendar-header">
                    <button className="calendar-btn" calendar-month="previous">
                      <svg height="24" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                      </svg>
                    </button>
            
                    <div className="calendar-month-label">
                      Feb 2019
                    </div>
            
            
                    <button className="calendar-btn" calendar-month="next">
                      <svg height="24" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="calendar-week">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>
                  <div className="calendar-month"></div>
                </div>
            )
        }
      }
    }