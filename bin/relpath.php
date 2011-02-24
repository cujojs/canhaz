<?php
// Execute on command line args
echo rel_path($argv[1], $argv[2]);

/**
 * Author: Santosh Patnaik
 * Original version: http://www.php.net/manual/en/function.realpath.php#77203
 * Original description:
 * Given real paths of two files, this function finds the relative path of one ($dest) with respect to the other ($root).
 * 
 * rel_path function to compute the relative path between two absolute paths.
 * Computes the path from root to dest.  For example:
 * rel_path('a/c', 'a/b') -> '../c'
 */
function rel_path($dest, $root = '', $dir_sep = '/') 
{ 
 $root = explode($dir_sep, $root); 
 $dest = explode($dir_sep, $dest); 
 $path = '.'; 
 $fix = ''; 
 $diff = 0; 
 for($i = -1; ++$i < max(($rC = count($root)), ($dC = count($dest)));) 
 { 
  if(isset($root[$i]) and isset($dest[$i])) 
  { 
   if($diff) 
   { 
    $path .= $dir_sep. '..'; 
    $fix .= $dir_sep. $dest[$i]; 
    continue; 
   } 
   if($root[$i] != $dest[$i]) 
   { 
    $diff = 1; 
    $path .= $dir_sep. '..'; 
    $fix .= $dir_sep. $dest[$i]; 
    continue; 
   } 
  } 
  elseif(!isset($root[$i]) and isset($dest[$i])) 
  { 
   for($j = $i-1; ++$j < $dC;) 
   { 
    $fix .= $dir_sep. $dest[$j]; 
   } 
   break; 
  } 
  elseif(isset($root[$i]) and !isset($dest[$i])) 
  { 
   for($j = $i-1; ++$j < $rC;) 
   { 
    $fix = $dir_sep. '..'. $fix; 
   } 
   break; 
  } 
 } 
  return $path. $fix; 
}
?>