/**
 * MTNNN Query Endpoint API Tests
 * Converted from Postman collection: MTNNN.pdf - Query Endpoint Tests
 *
 * Business context: MTNNN is a commercial triple net (NNN) lease. The system extracts
 * financial obligations and allows querying by keyword. Hallucination checks verify
 * that queries for obligations NOT in the document return 0 results.
 *
 * Prerequisite: MTNNN.pdf must be processed (POST /process) so consolidated JSON exists.
 */

const BASE_URL = 'http://localhost:8000';
const MTNNN_DOC_ID = 'MTNNN.pdf';

function postQuery(body: { query: string; save_output?: boolean; document_ids: string[] }) {
  return cy.request({
    method: 'POST',
    url: `${BASE_URL}/query`,
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}

describe('MTNNN Query Endpoint - Empty Query', () => {
  it('TC-M01: Empty Query (Default Utilities) - MTNNN', () => {
    postQuery({
      query: '',
      save_output: false,
      document_ids: [MTNNN_DOC_ID],
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results');
      expect(response.body.results).to.be.an('array');
    });
  });
});

describe('MTNNN Query Endpoint - Single-Term Queries', () => {
  const singleTerms = [
    { name: 'TC-M02: Single Term - rent', query: 'rent' },
    { name: 'TC-M03: Single Term - insurance', query: 'insurance' },
    { name: 'TC-M04: Single Term - tax', query: 'tax' },
    { name: 'TC-M05: Single Term - utilities', query: 'utilities' },
    { name: 'TC-M06: Single Term - maintenance', query: 'maintenance' },
    { name: 'TC-M07: Single Term - indemnification', query: 'indemnification' },
    { name: 'TC-M08: Single Term - deposit', query: 'deposit' },
    { name: 'TC-M09: Single Term - repair', query: 'repair' },
    { name: 'TC-M10: Single Term - HVAC', query: 'HVAC' },
  ];

  singleTerms.forEach(({ name, query }) => {
    it(name, () => {
      postQuery({
        query,
        save_output: false,
        document_ids: [MTNNN_DOC_ID],
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results');
      });
    });
  });
});

describe('MTNNN Query Endpoint - Multi-Term Queries', () => {
  const multiTerms = [
    { name: 'TC-M11: Multi-Term - rent payment property tax', query: 'rent payment property tax' },
    { name: 'TC-M12: Multi-Term - insurance premium liability', query: 'insurance premium liability' },
    { name: 'TC-M13: Multi-Term - common area maintenance CAM', query: 'common area maintenance CAM' },
    { name: 'TC-M14: Multi-Term - utilities water gas electricity', query: 'utilities water gas electricity' },
    { name: 'TC-M15: Multi-Term - late fee default remedies', query: 'late fee default remedies' },
  ];

  multiTerms.forEach(({ name, query }) => {
    it(name, () => {
      postQuery({
        query,
        save_output: false,
        document_ids: [MTNNN_DOC_ID],
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results');
      });
    });
  });
});

describe('MTNNN Query Endpoint - Hallucination Check (expect 0 obligations)', () => {
  const hallucinationCases = [
    {
      name: 'TC-H01: Hallucination - spacecraft insurance',
      query: 'spacecraft insurance orbital liability',
    },
    {
      name: 'TC-H02: Hallucination - tenant catering obligation',
      query: 'tenant shall provide free catering every week',
    },
    {
      name: 'TC-H03: Hallucination - landlord pays tenant income tax',
      query: 'landlord shall pay tenant income tax',
    },
    {
      name: 'TC-H04: Hallucination - zoo animals on premises',
      query: 'obligation to maintain zoo animals on premises',
    },
    {
      name: 'TC-H05: Hallucination - patent royalty payments',
      query: 'royalty payments for patent licensing',
    },
    {
      name: 'TC-H06: Hallucination - annual music festival',
      query: 'tenant obligation to host annual music festival',
    },
    {
      name: 'TC-H07: Hallucination - lunar lease clause',
      query: 'lunar land lease payment moon base',
    },
    {
      name: 'TC-H08: Hallucination - gibberish query',
      query: 'xyznonexistent123 zzzqwerty',
    },
  ];

  hallucinationCases.forEach(({ name, query }) => {
    it(name, () => {
      postQuery({
        query,
        save_output: false,
        document_ids: [MTNNN_DOC_ID],
      }).then((response) => {
        const count = response.body.total_obligations_found ?? 0;
        expect(response.status).to.eq(200);
        expect(count, 'No hallucination: out-of-scope query should return 0 obligations').to.eq(0);
      });
    });
  });
});

describe('MTNNN Query Endpoint - Edge Cases', () => {
  it('TC-E01: Non-existent document ID', () => {
    postQuery({
      query: 'rent',
      save_output: false,
      document_ids: ['NonExistentDoc.pdf'],
    }).then((response) => {
      const body = response.body;
      expect(response.status).to.eq(200);
      const zeroDocsOrZeroObligations =
        body.total_documents_searched === 0 || body.total_obligations_found === 0;
      expect(zeroDocsOrZeroObligations, 'Should have 0 docs searched or 0 obligations').to.be.true;
    });
  });

  it('TC-E02: Save output enabled', () => {
    postQuery({
      query: 'insurance',
      save_output: true,
      document_ids: [MTNNN_DOC_ID],
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results');
    });
  });

  it('TC-E03: Very long query string', () => {
    const longQuery =
      'rent payment security deposit property tax insurance common area maintenance utilities water gas electricity HVAC repair replacement indemnification reimbursement late fee default remedies hazardous materials environmental compliance';
    postQuery({
      query: longQuery,
      save_output: false,
      document_ids: [MTNNN_DOC_ID],
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results');
    });
  });
});
