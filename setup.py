from setuptools import setup, find_packages

setup(
    name="coinbot",
    version="0.1",
    entry_points={
      'console_scripts': [
        'coinbot = coinbot.__main__:main',
      ],
    },
)