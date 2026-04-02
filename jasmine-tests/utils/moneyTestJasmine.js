import {getMoneyFormat} from '../../scripts/utils/moneyFormat.js';
describe('Test suite: getMoneyFormat:',
  () => {
    it('convert dollars to cents',
       () => {
        expect(getMoneyFormat(2095)).toEqual('20.95');
       });

    it('works with 0',
       () => {
        expect(getMoneyFormat(0)).toEqual('0.00');
       });

    it('correct rounding',
       () => {
        expect(getMoneyFormat(2000.5)).toEqual('20.01');
       });
  }
);