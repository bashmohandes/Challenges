#!/usr/bin/python

import sys

def print_comb(input_str, start):
    """Returns the combination of the string for the characters X"""
    if start == len(input_str):
        print ''.join(input_str)
        return
    if input_str[start] == 'X':
        input_str[start] = '0'
        print_comb(input_str, start + 1)

        input_str[start] = '1'
        print_comb(input_str, start + 1)
        input_str[start] = 'X'
    else:
        print_comb(input_str, start + 1)


if len(sys.argv) == 2:
    print_comb(list(sys.argv[1]), 0)

