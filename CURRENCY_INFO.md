# 💱 Currency Information - BGN with EUR Conversion

## 🇧🇬 Bulgarian Lev (BGN)

All financial data is entered and stored in **BGN (Bulgarian Lev)**.

---

## 💶 Automatic EUR Conversion

The system automatically converts BGN to EUR for your convenience!

### Conversion Rate:
```
1 EUR = 1.95583 BGN (official fixed rate)
1 BGN = 0.5113 EUR
```

### Display Format:
All amounts are shown as:
```
BGN 100.00 (€51.13)
```

This means:
- **BGN 100.00** - Amount in Bulgarian Lev
- **(€51.13)** - Equivalent in Euros (rounded to 2 decimals)

---

## 📝 Examples

### Input:
When you enter amounts, you input them in **BGN**:
- General Revenue: `1000` BGN
- Staff Expense: `80` BGN
- Stock Expense: `200` BGN

### Display:
The system will show:
- General Revenue: **BGN 1000.00 (€511.29)**
- Staff Expense: **BGN 80.00 (€40.90)**
- Stock Expense: **BGN 200.00 (€102.26)**

---

## 📊 Where You'll See Both Currencies

### 1. Daily Input Summary
After entering data, the summary shows both:
```
Cash Revenue: BGN 800.00 (€409.03)
Total Expenses: BGN 300.00 (€153.39)
Cash Turnover: BGN 500.00 (€255.64)
```

### 2. Calendar View
Click any day to see:
```
General Revenue: BGN 1000.00 (€511.29)
POS Revenue: BGN 200.00 (€102.26)
Cash Revenue: BGN 800.00 (€409.03)
```

### 3. Reports Dashboard
Summary cards show both currencies:
```
📊 Total General Revenue
BGN 15000.00 (€7669.35)
```

### 4. Exported CSV Files
CSV exports include both BGN and EUR:
```
Total General Revenue,BGN 15000.00,€7669.35
Total Expenses,BGN 5000.00,€2556.45
General Turnover,BGN 10000.00,€5112.90
```

---

## 🎯 Benefits

✅ **Input in BGN** - Your local currency  
✅ **View in EUR** - International standard  
✅ **Automatic conversion** - No manual calculation  
✅ **Always accurate** - Official ECB fixed rate  
✅ **Rounded properly** - 2 decimal places  

---

## 💡 Technical Details

### Conversion Function:
```javascript
// Convert BGN to EUR
EUR = BGN / 1.95583

// Round to 2 decimals
EUR = Math.round(EUR * 100) / 100
```

### Example Calculation:
```
BGN 1000.00 to EUR:
1000 / 1.95583 = 511.2894...
Round: 511.29
Result: €511.29
```

---

## 🚀 Start Using It

1. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

2. **Start the app:**
   ```bash
   cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
   npm run dev
   ```

3. **Open:**
   ```
   http://localhost:3009
   ```

4. **Enter amounts in BGN** - EUR conversion happens automatically!

---

## 📞 Questions?

The conversion is automatic and always uses the official ECB fixed rate of **1 EUR = 1.95583 BGN**.

**Enjoy your dual-currency financial system!** 🇧🇬💶

