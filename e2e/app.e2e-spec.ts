import { InformesPage } from './app.po';

describe('informes App', () => {
  let page: InformesPage;

  beforeEach(() => {
    page = new InformesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
