import sys
from .window import Window
from PyQt5.QtWidgets import QApplication

def main():
  app = QApplication(sys.argv)
  window = Window(app)
  window.start()
  app.exec_()
    

if __name__ == "__main__":
  main()