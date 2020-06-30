import sys, requests, json
from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import pyqtSlot
  
class Window():
  def __init__(self, app):
    self.app = app
    self.widget = QWidget()
    self.ticker = Ticker()
    self.screen = app.primaryScreen()

  def start(self):
    textLabel = QLabel(self.widget)
    textLabel.setText('BTC: ${}'.format(self.ticker.price))

    self.widget.setGeometry(0, 0, self.screen.size().width(), self.screen.size().height())
    self.widget.setWindowTitle('Coinbot')
    self.widget.show()

    return self.widget

class Ticker():
  def __init__(self):
    res = requests.get('https://api.pro.coinbase.com/products/BTC-USD/ticker')
    self.price = json.loads(res.text)['price']


