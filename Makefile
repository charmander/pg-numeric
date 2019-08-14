test/decimal.csv: test/decimal.in test/decimal.py
	test/decimal.py $< > $@
