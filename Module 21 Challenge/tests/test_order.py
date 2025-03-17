import unittest
from unittest.mock import patch
from src.order import place_order

class TestOrderFunctions(unittest.TestCase):

    @patch("builtins.input", side_effect=["1", "2", "n"]) 
    def test_place_order(self, mock_input):
        order, total = place_order()

        print(f"DEBUG: order = {order}")  

        self.assertIsInstance(order, list)
        self.assertIsInstance(total, float)
        self.assertEqual(len(order), 1) 
        self.assertEqual(order[0]["name"], "Cheeseburger")
        self.assertEqual(order[0]["quantity"], 2)
        self.assertAlmostEqual(total, 5.99 * 2, places=2)

if __name__ == '__main__':
    unittest.main()
