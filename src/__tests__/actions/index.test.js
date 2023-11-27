import * as actions from './../../actions';

describe('Help Queue actions', () => {
  it('#1 deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: 'DELETE_TICKET',
      id: 1
    });
  });
});