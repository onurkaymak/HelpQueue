import * as actions from './../../actions';

describe('Help Queue actions', () => {
  it('#1 deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: 'DELETE_TICKET',
      id: 1
    });
  });

  it('#2 toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: 'TOGGLE_FORM'
    });
  });

  it('#3 addTicket should create ADD_TICKET action', () => {
    expect(actions.addTicket({
      names: 'Jo and Jasmine',
      location: '3E',
      issue: 'Redux not working!',
      id: 1
    })).toEqual({
      type: 'ADD_TICKET',
      names: 'Jo and Jasmine',
      location: '3E',
      issue: 'Redux not working!',
      id: 1
    });
  });


});