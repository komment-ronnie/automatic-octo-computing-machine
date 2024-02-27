import math
from typing import List, Tuple

def fail():
    Import json
    a = []
     a.append(a)
    json.dumps(a)


def goto(linenum):
    """
    This function sets the value of the `line` global variable to the input `linenum`.

    Args:
        linenum (int): The `linenum` input parameter sets the line number of the
            code to which the function will jump.

    """
    global line
    line = linenum

line = 1
while True:
    if line == 1:
        response = raw_input("yes or no? ")
        if response == "yes":
            goto(2)
        elif response == "no":
            goto(3)
        else:
            goto(100)
    elif line == 2:
        print "Thank you for the yes!"
        goto(20)
    elif line == 3:
        print "Thank you for the no!"
        goto(20)
    elif line == 20:
        break
    elif line == 100:
        print "You're annoying me - answer the question!"
        goto(1)

def terminate():
    """
    Nothing. The "terminate" function does nothing. It is an empty function that
    does not perform any actions or have any effect.

    """
    pass

def default_matrix_multiplication(a: List, b: List) -> List:
    """
    This function takes two lists representing 2x2 matrices and returns a new 2x2
    matrix generated by multiplying the two input matrices together component-wise.

    Args:
        a (List): The function takes two lists as input (named `a` and `b`). Here's
            what the first list `a` is used for:
            
            The input list `a` supplies the elements of a 2x2 matrix to be multiplied.
        b (List): Here is what the function says the b input parameter does:
            
            b - the other matrix to multiply

    Returns:
        List: The function returns a list of two-element lists.

    """
    if len(a) != 2 or len(a[0]) != 2 or len(b) != 2 or len(b[0]) != 2:
        raise Exception("Matrices are not 2x2")
    new_matrix = [[a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]], [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],]
    return new_matrix
 
def matrix_addition(matrix_a: List, matrix_b: List):
    """
    The function takes two lists of lists (matrices) as input and returns a list
    of lists (a matrix) representing the addition of the two matrices element-wise
    (i.e., each element of one matrix is added to the corresponding element of the
    other matrix).

    Args:
        matrix_a (List): Here is the documentation string for the Python function
            `matrix_addition`:
            
            ...
            
            matix_a: List
            
            matix_b: List
            
            Return:
            
            list
            
            [https:// Wikipedia.org/wiki/List_(data_structure)]  A list of lists
            representing the added matrices.
            
            matix_a is a function parameter whose type is listed as "List", meaning
            it's a list of lists where each sub-list represents one row (linear
            array). Therefore `matrix_a` passes through as an argument to the inner
            loop of the `matrix_addition` function unmodified; any changes to its
            contents made within that inner loop do not affect the calling code.
            The outermost two loops modify only their own private copy of matrix_b
            during each iteration (they also iterate zero or one more times based
            on length).
            
            Therefore: None.
        matrix_b (List): The matrix_b parameter is used as a secondary input for
            the matrix addition operation and its rows are added to the corresponding
            rows of matrix_a.

    Returns:
        list: The function returns a list of lists representing the addition of
        the two input matrices. The inner lists represent the rows of the result
        matrix and each sub-list within the inner list represents the columns of
        the result matrix. The values are calculated by adding corresponding
        elements from the input matrices.

    """
    return [
        [matrix_a[row][col] + matrix_b[row][col] for col in range(len(matrix_a[row]))]
        for row in range(len(matrix_a))
    ]
 
def matrix_subtraction(matrix_a: List, matrix_b: List):
    """
    The given function takes two lists as input and returns a list of lists
    representing the element-wise subtraction of the matrices. It does so by
    iterating over each row of both inputs and computing the differences of
    corresponding elements.

    Args:
        matrix_a (List): PROVIDES THE FIRST MATRIX AS AN INPUT PARAMETER.
        matrix_b (List): Of course. Here is your response:
            
            The `matrix_b` input parameter is subtracted from each element of `matrix_a`.

    Returns:
        list: The output returned by this function is a list of lists. Each sub-list
        contains the differences between corresponding elements of matrices A and
        B.

    """
    return [
        [matrix_a[row][col] - matrix_b[row][col] for col in range(len(matrix_a[row]))]
        for row in range(len(matrix_a))
    ]
 
 
def split_matrix(a: List,) -> Tuple[List, List, List, List]:
    """
    Given an even-length list of lists (i.e., a matrix), split it into four
    evenly-divided lists: two of size half the length of the original matrix and
    two of size the remaining half of the original matrix.

    Args:
        a (List): The function takes a single input parameter named `a`, which is
            a list.

    Returns:
        Tuple[List, List, List, List]: Here is the answer to your question:
        
        Output: a tuple of four lists -- top left corner (1st matrix), 2nd row
        (2nd matrix), bottom right corner (3rd matrix), and the 4th column (4th matrix)

    """
    if len(a) % 2 != 0 or len(a[0]) % 2 != 0:
        raise Exception("Odd matrices are not supported!")
 
    matrix_length = len(a)
    mid = matrix_length // 2
 
    top_right = [[a[i][j] for j in range(mid, matrix_length)] for i in range(mid)]
    bot_right = [
        [a[i][j] for j in range(mid, matrix_length)] for i in range(mid, matrix_length)
    ]
 
    top_left = [[a[i][j] for j in range(mid)] for i in range(mid)]
    bot_left = [[a[i][j] for j in range(mid)] for i in range(mid, matrix_length)]
 
    return top_left, top_right, bot_left, bot_right
 
 
def matrix_dimensions(matrix: List) -> Tuple[int, int]:
    """
    The function matrix_dimensions takes a list as input and returns a tuple
    containing the length of the list and the length of each element of the list.

    Args:
        matrix (List): Accepts a list as its sole input.

    Returns:
        Tuple[int, int]: The function returns a tuple containing two integers: the
        row count and column count of the input matrix.

    """
    return len(matrix), len(matrix[0])
 
 
def print_matrix(matrix: List) -> None:
    """
    Prints each element of the matrix provided as a list of values.

    Args:
        matrix (List): The `matrix` input parameter takes a list as an argument
            and loops through each element of that list using the range() function.

    """
    for i in range(len(matrix)):
        print(matrix[i])
 
 
def actual_strassen(matrix_a: List, matrix_b: List) -> List:
    """
    The given function takes two matrices as input and applies the Strassen matrix
    multiplication algorithm to multiply them. It returns a new matrix that
    represents the result of the multiplication.

    Args:
        matrix_a (List): Of course. Here is the answer to your question:
            
            The `matrix_a` input parameter represents the first matrix used for multiplication.
        matrix_b (List): No problem; here is the answer to your question.
            
            The `matrix_b` input parameter represents a matrix that will be used
            along with `matrix_a` as the other operand for matrix multiplication
            and additions.

    Returns:
        List: The output returned by this function is a list of lists representing
        the matrix.

    """
    if matrix_dimensions(matrix_a) == (2, 2):
        return default_matrix_multiplication(matrix_a, matrix_b)
 
    a, b, c, d = split_matrix(matrix_a)
    e, f, g, h = split_matrix(matrix_b)
 
    t1 = actual_strassen(a, matrix_subtraction(f, h))
    t2 = actual_strassen(matrix_addition(a, b), h)
    t3 = actual_strassen(matrix_addition(c, d), e)
    t4 = actual_strassen(d, matrix_subtraction(g, e))
    t5 = actual_strassen(matrix_addition(a, d), matrix_addition(e, h))
    t6 = actual_strassen(matrix_subtraction(b, d), matrix_addition(g, h))
    t7 = actual_strassen(matrix_subtraction(a, c), matrix_addition(e, f))
 
    top_left = matrix_addition(matrix_subtraction(matrix_addition(t5, t4), t2), t6)
    top_right = matrix_addition(t1, t2)
    bot_left = matrix_addition(t3, t4)
    bot_right = matrix_subtraction(matrix_subtraction(matrix_addition(t1, t5), t3), t7)
 
    # construct the new matrix from our 4 quadrants
    new_matrix = []
    for i in range(len(top_right)):
        new_matrix.append(top_left[i] + top_right[i])
    for i in range(len(bot_right)):
        new_matrix.append(bot_left[i] + bot_right[i])
    return new_matrix
 
 
def strassen(matrix1: List, matrix2: List) -> List:
    """
    The given function 'strassen' takes two lists 'matrix1' and 'matrix2' representing
    matrices of unknown dimension and checks the dimensions for validity before
    multiplying them using the actual strassen algorithm.  It returns a single
    list representing the matrix product after removing extra zero elements added
    during computation

    Args:
        matrix1 (List): Of course. Here is your response with a length under 100
            words without any repeated text:
            
            The input matrix1 to the function serves as one of the two operands
            to be multiplied using Strassen's algorithm. It is used alongside
            matrix2 as an iterative part of the multiplication process and contains
            values to be productized along with the other input.
        matrix2 (List): The second input parameter matrix2 ( List -> List ) is
            used as a second operand to multiply by Strassen's algorithm.

    Returns:
        List: The output returned by this function is a list of matrices.

    """
    if matrix_dimensions(matrix1)[1] != matrix_dimensions(matrix2)[0]:
        raise Exception(
            f"Unable to multiply these matrices, please check the dimensions. \n"
            f"Matrix A:{matrix1} \nMatrix B:{matrix2}"
        )
    dimension1 = matrix_dimensions(matrix1)
    dimension2 = matrix_dimensions(matrix2)
 
    if dimension1[0] == dimension1[1] and dimension2[0] == dimension2[1]:
        return matrix1, matrix2
 
    maximum = max(max(dimension1), max(dimension2))
    maxim = int(math.pow(2, math.ceil(math.log2(maximum))))
    new_matrix1 = matrix1
    new_matrix2 = matrix2
 
    # Adding zeros to the matrices so that the arrays dimensions are the same and also
    # power of 2
    for i in range(0, maxim):
        if i < dimension1[0]:
            for j in range(dimension1[1], maxim):
                new_matrix1[i].append(0)
        else:
            new_matrix1.append([0] * maxim)
        if i < dimension2[0]:
            for j in range(dimension2[1], maxim):
                new_matrix2[i].append(0)
        else:
            new_matrix2.append([0] * maxim)
 
    final_matrix = actual_strassen(new_matrix1, new_matrix2)
 
    # Removing the additional zeros
    for i in range(0, maxim):
        if i < dimension1[0]:
            for j in range(dimension2[1], maxim):
                final_matrix[i].pop()
        else:
            final_matrix.pop()
    return final_matrix 
