// Next.js API route for categories

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: {
        staff_roles: [
          'Waiter 1',
          'Waiter 2',
          'Waiter 3',
          'Waiter 4',
          'Waiter 5',
          'Bartender 1',
          'Bartender 2',
          'Security 1',
          'Security 2',
          'Security 3',
          'DJ',
          'Cleaner',
          'Manager'
        ],
        expense_types: [
          'Stock Expenses',
          'Cleaning Services',
          'DJ Services',
          'Security Services',
          'POS Terminal',
          'Marketing',
          'Utilities',
          'Rent',
          'Maintenance',
          'Consulting Services',
          'Licenses & Permits',
          'Insurance',
          'Voided Bills (Storniрана сметка)',
          'Other'
        ]
      }
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

