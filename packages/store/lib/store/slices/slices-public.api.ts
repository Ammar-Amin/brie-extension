import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Slice } from '@extension/shared';
import { CEB_API_BASE_URL } from '@extension/env';

import { attachmentUrlPath } from './slices-private.api.js';

export const slicesPublicAPI = createApi({
  reducerPath: 'slices-public',
  baseQuery: fetchBaseQuery({ baseUrl: CEB_API_BASE_URL }),
  endpoints: build => ({
    getPublicSliceById: build.query<Slice, { id: string }>({
      query: ({ id }) => ({
        url: `/slices/public/${id}`,
      }),
      transformResponse: (slice: Slice) => ({
        ...slice,
        labels: typeof slice.labels === 'string' ? JSON.parse(slice.labels) : slice.labels,
        attachments: slice.attachments.map((a: any) => ({
          ...a,
          preview: attachmentUrlPath(a),
        })),
      }),
    }),
  }),
});
