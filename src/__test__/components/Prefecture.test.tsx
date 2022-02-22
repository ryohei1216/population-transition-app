import React, { useState } from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Prefecture } from '../../api/prefectures';
import 'whatwg-fetch';
import Prefectures from '../../components/Prefectures';

/**
 * テスト内容
 * １．スナップショットテスト ２．ユニットテスト
 * APIで都道府県の取得ができてるか
 * チェックボックスを１回目と２回め押すときに表示が変わるか
 * 押したときに関数が呼ばれているか
 */

const server = setupServer(
  rest.get(
    `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: null,
          result: [
            {
              prefCode: 1,
              prefName: '北海道',
            },
            {
              prefCode: 2,
              prefName: '青森県',
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Prefectureコンポーネントのテスト', () => {
  test('APIから都道府県の取得・表示', async () => {
    const setPrefectureList = jest.fn();
    const { asFragment } = render(
      <Prefectures setPrefectureList={setPrefectureList} />
    );
    expect(asFragment()).toMatchSnapshot();

    expect(await screen.findByTestId('1')).toHaveTextContent('北海道');
    expect(await screen.findByTestId('2')).toHaveTextContent('青森県');

    expect(asFragment()).toMatchSnapshot();
  });

  test('checkboxクリック', async () => {
    const setPrefectureList = jest.fn();
    const { asFragment } = render(
      <Prefectures setPrefectureList={setPrefectureList} />
    );
    expect(asFragment()).toMatchSnapshot();

    const checkbox1 = await screen.findByTestId('北海道');
    fireEvent.click(checkbox1);
    expect(setPrefectureList).toHaveBeenCalled();
    expect(checkbox1).toBeChecked();

    fireEvent.click(checkbox1);
    expect(setPrefectureList).toHaveBeenCalled();
    expect(checkbox1).not.toBeChecked();

    expect(asFragment()).toMatchSnapshot();
  });
});
